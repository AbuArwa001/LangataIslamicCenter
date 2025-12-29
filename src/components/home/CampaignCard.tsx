"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { stripHtml } from "@/lib/htmlUtils";

interface ProjectImage {
  id: number;
  image: string;
}

interface Project {
  id: string;
  name: string;
  description: string;
  goal_amount: number;
  total_donated: number;
  progress_percentage: number;
  images: ProjectImage[];
  image: string | null;
}

export default function CampaignCard({ project }: { project: Project }) {
  const [index, setIndex] = useState(0);

  const images =
    project.images && project.images.length > 0
      ? project.images.map((img) => img.image)
      : project.image
      ? [project.image]
      : ["/about_1.jpg"];

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(
        () => setIndex((i) => (i + 1) % images.length),
        4000
      );
      return () => clearInterval(timer);
    }
  }, [images.length]);

  return (
    <div className="max-w-4xl mx-auto rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 group bg-white">
      <div className="grid md:grid-cols-2">
        <div className="h-80 md:h-auto relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              alt={project.name}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === index ? "bg-white w-4" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="p-10 flex flex-col">
          <div className="inline-block bg-[#00b17b]/10 text-[#00b17b] text-xs font-bold px-3 py-1 rounded-full mb-4 w-fit">
            FEATURED CAMPAIGN
          </div>
          <h3 className="text-3xl font-bold mb-4">{project.name}</h3>
          <p className="text-gray-600 mb-8 line-clamp-4 flex-grow bg-white/50">
            {stripHtml(project?.description)}
          </p>

          <div className="mb-8">
            <div className="flex justify-between text-sm font-bold mb-2">
              <span className="text-[#00b17b]">
                KSh {(project.total_donated || 0).toLocaleString()}
              </span>
              <span className="text-gray-400">
                Target: KSh {(project.goal_amount || 0).toLocaleString()}
              </span>
            </div>
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${Math.min(project.progress_percentage || 0, 100)}%`,
                }}
                transition={{ duration: 1.5 }}
                className="bg-[#fbb03b] h-full rounded-full"
              />
            </div>
            <p className="text-right text-xs font-bold mt-1 text-[#fbb03b]">
              {project.progress_percentage || 0}% Complete
            </p>
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="w-full block bg-[#fbb03b] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#00b17b] transition-all text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            View Details & Contribute
          </Link>
        </div>
      </div>
    </div>
  );
}
