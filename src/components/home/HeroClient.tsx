"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HeroClient() {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row gap-6 justify-center">
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-[#00b17b] hover:bg-[#009668] px-14 py-4 rounded-full font-bold text-lg shadow-xl text-white"
        onClick={() => router.push("/donate")}
      >
        Donate
      </motion.button>

      <motion.button
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="bg-[#FFC06E] hover:bg-[#eeb160] text-[#441A05] px-14 py-4 rounded-full font-bold text-lg shadow-xl"
        onClick={() => router.push("/about")}
      >
        Learn More
      </motion.button>
    </div>
  );
}
