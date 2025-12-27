"use client";

import { motion, AnimatePresence } from "framer-motion";
import { about } from "@/data/aboutData";
import { X } from "lucide-react"; // Assuming lucide-react is available, or I'll use an SVG
import { useEffect } from "react";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Gallery images - using available images from public folder
const galleryImages = [
  "/about_1.jpg",
  "/about_2.jpg",
  "/about_3.jpg",
  "/campaign.jpg",
  "/hero-mosque.jpg",
  "/donation.jpg",
];

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 z-50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none"
          >
            {/* Modal Content */}
            <div className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto relative">
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white z-10 sticky top-0">
                <div>
                  <h2 className="text-2xl md:text-3xl font-serif text-slate-900">
                    {about.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    A journey of faith and community
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-slate-500 group-hover:text-red-500 transition-colors"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto flex-1 p-6 md:p-10 space-y-12 custom-scrollbar">
                {about.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="prose prose-lg max-w-none"
                  >
                    <h3 className="text-xl font-bold text-[#eebb75] uppercase tracking-wider mb-4 border-l-4 border-[#eebb75] pl-4">
                      {section.subtitle}
                    </h3>
                    <div className="text-slate-600 leading-relaxed whitespace-pre-line pl-4">
                      {section.content}
                    </div>
                  </motion.div>
                ))}

                {/* Gallery Section */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="pt-8 border-t border-gray-100"
                >
                  <h3 className="text-2xl font-serif text-slate-900 mb-6 text-center">
                    Our Journey in Pictures
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((src, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-video rounded-lg overflow-hidden shadow-md cursor-pointer group"
                      >
                        <img
                          src={src}
                          alt={`Gallery image ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer Gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
