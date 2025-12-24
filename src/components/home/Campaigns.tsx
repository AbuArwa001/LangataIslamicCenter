"use client";
import { motion } from "framer-motion";

export default function Campaigns() {
  return (
    <section className="py-24 bg-white text-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100, bounce: 0.6 }}
      >
        <h2 className="text-5xl font-bold mb-4">
          <span className="text-[#fbb03b]">ONGOING</span>{" "}
          <span className="text-[#00b17b]">CAMPAIGNS</span>
        </h2>
        <div className="flex justify-center mb-12">
          <div className="h-1.5 w-20 bg-[#fbb03b]"></div>
          <div className="h-1.5 w-20 bg-[#00b17b]"></div>
        </div>
        
        {/* Campaign Card */}
        <div className="max-w-sm mx-auto rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 group">
          <img src="/campaign.jpg" className="w-full h-72 object-cover" />
          <div className="p-10">
            <h3 className="text-2xl font-bold mb-8">Langata Mosque Donation</h3>
            <button className="w-full bg-[#fbb03b] text-[#00b17b] py-4 rounded-2xl font-bold text-lg group-hover:bg-[#00b17b] group-hover:text-white transition-all">
              Read More
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}