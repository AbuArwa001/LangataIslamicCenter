"use client";

import { useState } from "react";
import AboutModal from "./AboutModal";
import { motion } from "framer-motion";

export default function ReadMoreButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsModalOpen(true)}
        className="bg-[#2ca082] hover:bg-[#238a6f] text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl mt-4"
      >
        Read More
      </motion.button>
      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
