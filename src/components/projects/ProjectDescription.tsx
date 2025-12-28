"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight } from "lucide-react";
import { stripHtml } from "@/lib/htmlUtils";

interface ProjectDescriptionProps {
  description: string;
}

export default function ProjectDescription({
  description,
}: ProjectDescriptionProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!description) return null;

  const cleanText = stripHtml(description);
  const wordCount = cleanText.trim().split(/\s+/).length;
  const charCount = cleanText.length;

  const isLong = wordCount > 200 || charCount > 1465;

  const toggleModal = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
        {description.startsWith("<") ? (
          <div
            className={isLong ? "line-clamp-[15] relative" : ""}
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <div
            className={`whitespace-pre-wrap ${
              isLong ? "line-clamp-[15] relative" : ""
            }`}
          >
            {description}
          </div>
        )}

        {isLong && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {isLong && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={toggleModal}
            className="flex items-center px-8 py-3 bg-[#5c2a0a] text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-[#441a05] transition-all group transform hover:-translate-y-1"
          >
            Read More
            <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      )}

      {/* Full Description Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm"
            onClick={toggleModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                <h3 className="text-2xl font-bold text-[#3d2616] font-serif">
                  Project Description
                </h3>
                <button
                  onClick={toggleModal}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar">
                <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
                  {description.startsWith("<") ? (
                    <div dangerouslySetInnerHTML={{ __html: description }} />
                  ) : (
                    <div className="whitespace-pre-wrap">{description}</div>
                  )}
                </div>
              </div>

              <div className="p-6 border-t bg-gray-50 flex justify-center">
                <button
                  onClick={toggleModal}
                  className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-md"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
