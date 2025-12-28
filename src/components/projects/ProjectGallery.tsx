"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface ProjectGalleryProps {
  images: { id: number; image: string }[];
  projectName: string;
}

export default function ProjectGallery({
  images,
  projectName,
}: ProjectGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  // Filter out nulls and handle duplicates
  const uniqueImages = Array.from(
    new Map(
      images.filter((img) => img.image).map((img) => [img.image, img])
    ).values()
  );

  if (uniqueImages.length === 0) {
    return (
      <div className="bg-gray-50 rounded-2xl p-12 text-center border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">
          No gallery images available for this project yet.
        </p>
      </div>
    );
  }

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);

  const showNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % uniqueImages.length);
    }
  };

  const showPrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + uniqueImages.length) % uniqueImages.length
      );
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueImages.map((img, index) => (
          <motion.div
            key={img.id}
            layoutId={`image-${img.id}`}
            className="relative aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer group"
            onClick={() => openLightbox(index)}
            whileHover={{ y: -5 }}
          >
            <Image
              src={img.image}
              alt={`${projectName} gallery image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-full text-white border border-white/30">
                <Maximize2 className="w-6 h-6" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[160] p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={showPrev}
              className="absolute left-4 md:left-10 text-white/70 hover:text-white transition-colors z-[160] p-3 hover:bg-white/10 rounded-full bg-black/20"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={showNext}
              className="absolute right-4 md:right-10 text-white/70 hover:text-white transition-colors z-[160] p-3 hover:bg-white/10 rounded-full bg-black/20"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div
              className="relative w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                key={selectedImageIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full h-full max-h-[80vh]"
              >
                <Image
                  src={uniqueImages[selectedImageIndex].image}
                  alt={`${projectName} preview`}
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>

              <div className="absolute bottom-0 left-0 right-0 text-center text-white/60 text-sm pb-4">
                Image {selectedImageIndex + 1} of {uniqueImages.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
