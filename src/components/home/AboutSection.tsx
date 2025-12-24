"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative py-24 text-white overflow-hidden">
      {/* Background Image: donation.jpg */}
      <div className="absolute inset-0 z-0">
        <img src="/donation.jpg" className="w-full h-full object-cover" alt="Interior" />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl font-bold text-[#fbb03b] mb-8">About Us</h2>
          <div className="text-lg leading-relaxed space-y-6">
            <p>
              <span className="text-7xl float-left mr-4 mt-2 font-bold leading-none">P</span>
              rior to 1984, there was no Madrasa in all the Estates in the whole neighborhood of Langata comprising Southlands, Ngei 1 and Ngei 2, Akiba, Onyonka, Otiende, Jambo, Rubia, Customs, Masai, Civil Servants, Uhuru Gardens, etc.
            </p>
          </div>
          <button className="mt-8 bg-[#fbb03b] text-gray-900 px-10 py-3 rounded-full font-bold">Learn More</button>
        </motion.div>

        {/* Hover Effect on Image */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          className="rounded-3xl overflow-hidden border-8 border-white/10 shadow-2xl cursor-pointer transition-all"
        >
          <img src="/about_1.jpg" alt="Building" />
        </motion.div>
      </div>
    </section>
  );
}