"use client";
import { motion } from "framer-motion";

export default function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${Math.min(percentage || 0, 100)}%` }}
        transition={{ duration: 2 }}
        className="bg-[#00b17b] h-full"
      />
    </div>
  );
}
