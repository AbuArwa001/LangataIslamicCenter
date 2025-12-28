"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const images = ["/about_3.jpg", "/about_2.jpg"];

export default function Fundraising() {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Text slides from LEFT */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-[#fbb03b]">MASJID</span>{" "}
            <span className="text-[#00b17b]">FUNDRAISING PROGRESS</span>
          </h2>
          <p className="text-gray-600 italic mb-8 text-lg">
            "Whoever builds a mosque for the sake of Allah, Allah will build for
            him a house in Paradise"
          </p>
          <div className="mb-10">
            <p className="text-xl font-bold mb-4">
              <span className="text-[#fbb03b]">KSh 1.01 million</span>
              <span className="text-gray-400 font-normal"> of </span>
              <span className="text-[#c1272d]">KSh 315 million</span> raised
            </p>
            <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden shadow-inner">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "1%" }}
                transition={{ duration: 2 }}
                className="bg-[#00b17b] h-full"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => router.push("/donate")}
              className="bg-[#00b17b] text-white px-10 py-3 rounded-2xl font-bold"
            >
              Donate
            </button>
            <button
              onClick={() => router.push("/about")}
              className="bg-[#fbb03b] text-white px-10 py-3 rounded-2xl font-bold"
            >
              Learn More
            </button>
          </div>
        </motion.div>

        {/* Right: Slider slides from RIGHT */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={index}
              src={images[index]}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
