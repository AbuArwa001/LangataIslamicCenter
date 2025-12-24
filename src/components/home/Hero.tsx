"use client";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative h-[90vh] flex items-center justify-center text-white overflow-hidden font-serif">
      {/* Background Image Container */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-mosque.jpg')" }} 
      >
        {/* Exact #000000 Overlay with 60% opacity */}
        <div className="absolute inset-0 bg-[#000000] opacity-60"></div>
      </div>
      
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Brand Colors applied here */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
            <span className="text-[#FFC06E]">LANGATA</span>{" "}
            <span className="text-[#441A05]">MOSQUE</span>
          </h1>
          
          <div className="flex justify-center mb-6">
            <div className="h-1.5 w-20 bg-[#FFC06E]"></div>
            <div className="h-1.5 w-20 bg-[#00b17b]"></div>
          </div>

          {/* Subtitle using the <strong> tag */}
          <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto">
            <strong>Build Langata Mosque: A Beacon of Faith & Education</strong>
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#00b17b] hover:bg-[#009668] px-14 py-4 rounded-full font-bold text-lg shadow-xl"
          >
            Donate
          </motion.button>

          <motion.button
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-[#FFC06E] hover:bg-[#eeb160] text-[#441A05] px-14 py-4 rounded-full font-bold text-lg shadow-xl"
          >
            Learn More
          </motion.button>
        </div>
      </div>

      {/* --- MOUNTAIN SHAPE DIVIDER --- */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-[calc(100%+1.3px)] h-[100px] fill-[#f9f9f9]"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120c0,0,165.7-28.85,321.39-63.56Z"></path>
        </svg>
      </div>
    </section>
  );
}