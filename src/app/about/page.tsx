"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";
import AboutModal from "@/components/about/AboutModal";

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Animation Variants
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeInScale: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder - distinct from the rest */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('/about-hero-bg.jpg')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInScale}
            className="text-6xl md:text-7xl font-serif text-[#eebb75] tracking-wide drop-shadow-lg"
          >
            About Us
          </motion.h1>
        </div>
      </div>

      {/* Main Split Section */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInLeft}
            className="space-y-8"
          >
            <h2 className="text-5xl font-serif text-[#1e293b] mb-8">
              About Us
            </h2>

            <div className="space-y-6 text-[#475569] leading-relaxed text-[15px] font-light">
              <div>
                <h3 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-2">
                  History of Langata Islamic Welfare Organisation (LIWO)
                </h3>
                <h4 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-4">
                  How it all started :
                </h4>
                <p>
                  Prior to 1984, there was no Madrasa in all the Estates in the
                  whole neighborhood of Langata comprising Southlands, Ngei 1
                  and Ngei 2, Akiba, Onyonka, Otiende, Jambo, Rubia, Customs,
                  Masai, Civil Servants, Uhuru Gardens, etc. Of course there was
                  no mosque either. At the time there were close to 20 churches
                  in the vicinity.
                </p>
                <p className="mt-4">
                  To attend a Madrasa, children had to go to Kibra or South C.
                  The parents had a difficult duty of transporting them to and
                  from such distant places. This led to some parents engaging
                  private Ustadhs/Ustadhas to teach their children at home. In
                  some cases some children did not attend Madrasas at all.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-2">
                  Establishing a Madrasa :
                </h4>
                <p>
                  It is this inconvenience which eventually brought a few
                  Muslims together sometime in 1984, with a view to start a
                  Madrasa within the neighborhood. As a quick solution, one of
                  the pioneer members, Marhum Said Omar Nadhir, volunteered to
                  surrender his official car garage at the Customs Estate to be
                  converted into a Madrasa. He also sourced the very first
                  Ustadh for the Madrasa, Ustadh Hassan Komesha. Once the
                  Madrasa was up and running in 1985, the initiators went door
                  to door to all houses in the neighborhood occupied by Muslims
                  on a campaign to advertise the same.
                </p>
                <p className="mt-4">
                  The number of students grew so fast that within no time the
                  one garage was not adequate to accommodate all of them.
                  Luckily, the occupier of the garage adjacent to the Madrasa,
                  and who was not even a Muslim, offered the use of his garage
                  to host the students. Thus the Madrasa expanded.
                </p>
                <p className="mt-4">
                  During this period, the Madrasa was very vibrant and lively,
                  and a number of prize-giving ceremonies were hosted within the
                  Costoms Estate grounds...
                </p>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsModalOpen(true)}
              className="bg-[#2ca082] hover:bg-[#238a6f] text-white px-8 py-3 rounded-full font-medium transition-colors shadow-lg hover:shadow-xl mt-4"
            >
              Read More
            </motion.button>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={slideInRight}
            className="relative h-full min-h-[600px] w-full bg-slate-100 rounded-lg overflow-hidden shadow-2xl"
          >
            {/* Placeholder for the Building Render */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
              <img
                src="/building-render-placeholder.jpg"
                alt="Future Islamic Center"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="relative h-[400px] w-full bg-slate-100 rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
              {/* Placeholder for Mission Image (Aerial View) */}
              <img
                src="/mission-placeholder.jpg"
                alt="Mission Aerial View"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="space-y-6"
          >
            <h2 className="text-5xl font-serif text-[#0f172a] mb-4">
              Our Mission
            </h2>
            <p className="text-[#334155] text-lg leading-relaxed max-w-md">
              To nurture a God-fearing community through spiritual growth,
              education, and social empowerment
            </p>
          </motion.div>
        </div>

        {/* Vision Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center py-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInLeft}
            className="space-y-6 lg:order-1 order-2"
          >
            <h2 className="text-5xl font-serif text-[#0f172a] mb-4">
              Vision Statement
            </h2>
            <p className="text-[#334155] text-lg leading-relaxed max-w-md">
              To establish a leading Islamic Center that inspires generations
              through worship, learning, and sustainable development.
            </p>
          </motion.div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInRight}
            className="relative h-[500px] w-full bg-slate-100 rounded-sm overflow-hidden lg:order-2 order-1"
          >
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
              {/* Placeholder for Vision Image (Building Side View) */}
              <img
                src="/vision-placeholder.jpg"
                alt="One of our vision renders"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>

        {/* Meet The Team Section */}
        <div className="pt-12">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">
                Meet the Team
              </h4>
              <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900">
                Powered by our people
              </h2>
            </motion.div>
          </div>

          <div className="space-y-16">
            {/* Chairman Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="max-w-3xl mx-auto bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-slate-300 h-80 relative overflow-hidden">
                {/* Wave Pattern SVG */}
                <div className="absolute inset-0 opacity-30">
                  <svg
                    viewBox="0 0 1440 320"
                    className="absolute bottom-0 w-full h-auto text-white fill-current"
                  >
                    <path d="M0,160L60,165.3C120,171,240,181,360,197.3C480,213,600,235,720,224C840,213,960,171,1080,160C1200,149,1320,171,1380,181.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
                  </svg>
                </div>
                <div className="absolute bottom-10 left-10 w-16 h-16 bg-slate-100 rounded-full opacity-50"></div>
              </div>
              <div className="p-10 text-center">
                <h3 className="text-3xl font-serif text-slate-900 mb-2">
                  Ibrahim Said
                </h3>
                <p className="text-slate-600 mb-6 font-light">
                  A Renowned Islamic Scholar With 20+ Years Of Community
                  Leadership Experience.
                </p>
                <div className="inline-block border border-slate-800 px-6 py-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Chairman, LIWO Mosque Board
                </div>
              </div>
            </motion.div>

            {/* Other Team Members Grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { name: "Juma Abdallah", role: "Treasurer" }, // Corrected "Treasure" to "Treasurer"
                { name: "Osman Ali", role: "Vice Treasurer" }, // Corrected "Vice treasure"
                { name: "Abubakar Hussein", role: "Assistant Secretary" }, // Corrected "Ass Secretary"
                { name: "Abdullahi Abdi", role: "Organising Secretary" },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="bg-slate-300 h-64 relative overflow-hidden">
                    {/* Wave Pattern SVG */}
                    <div className="absolute inset-0 opacity-30">
                      <svg
                        viewBox="0 0 1440 320"
                        className="absolute bottom-0 w-full h-auto text-white fill-current transform scale-150 origin-bottom"
                      >
                        <path d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,224C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                      </svg>
                    </div>
                    <div className="absolute bottom-8 left-6 w-12 h-12 bg-slate-100 rounded-full opacity-50"></div>
                  </div>
                  <div className="p-8 text-center bg-[#f9fafb]">
                    <h3 className="text-xl font-serif text-slate-900 mb-4">
                      {member.name}
                    </h3>
                    <div className="inline-block border border-slate-400 px-4 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white">
                      {member.role}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
      <AboutModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
