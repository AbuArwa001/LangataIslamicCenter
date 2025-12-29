"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
  question: string;
  answer: React.ReactNode;
}

export default function FAQAccordion({ faqs }: { faqs: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-start justify-between p-6 text-left"
          >
            <span
              className={`font-bold text-lg ${
                openIndex === index ? "text-emerald-700" : "text-slate-800"
              }`}
            >
              {faq.question}
            </span>
            <span
              className={`ml-4 p-1 rounded-full ${
                openIndex === index
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </span>
          </button>

          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
