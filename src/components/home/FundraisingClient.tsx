"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface ProjectImage {
  id: number;
  image: string;
}

interface Project {
  id: string;
  name: string;
  goal_amount: number;
  total_donated: number;
  progress_percentage: number;
  images: ProjectImage[];
  image: string | null;
}

export default function FundraisingClient({ project }: { project: Project }) {
  const router = useRouter();
  const [index, setIndex] = useState(0);

  const images =
    project.images && project.images.length > 0
      ? project.images.map((img) => img.image)
      : project.image
      ? [project.image]
      : ["/about_3.jpg", "/about_2.jpg"];

  useEffect(() => {
    if (images.length > 1) {
      const timer = setInterval(
        () => setIndex((i) => (i + 1) % images.length),
        5000
      );
      return () => clearInterval(timer);
    }
  }, [images.length]);

  return (
    <div className="grid md:grid-cols-2 gap-16 items-center">
      {/* Left: Text slides from LEFT */}
      <div>
        <h2 className="text-4xl font-bold mb-6">
          <span className="text-[#fbb03b]">
            {project.name.split(" ")[0].toUpperCase()}
          </span>{" "}
          <span className="text-[#00b17b]">
            {project.name.split(" ").slice(1).join(" ").toUpperCase()}{" "}
            FUNDRAISING PROGRESS
          </span>
        </h2>
        <p className="text-gray-600 italic mb-8 text-lg">
          "Whoever builds a mosque for the sake of Allah, Allah will build for
          him a house in Paradise"
        </p>
        <div className="mb-10">
          <p className="text-xl font-bold mb-4">
            <span className="text-[#fbb03b]">
              KSh {(project.total_donated || 0).toLocaleString()}
            </span>
            <span className="text-gray-400 font-normal"> of </span>
            <span className="text-[#c1272d]">
              KSh {(project.goal_amount || 0).toLocaleString()}
            </span>{" "}
            raised
          </p>
          <div className="w-full bg-gray-200 h-6 rounded-full overflow-hidden shadow-inner">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{
                width: `${Math.min(project.progress_percentage || 0, 100)}%`,
              }}
              transition={{ duration: 2 }}
              className="bg-[#00b17b] h-full"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => router.push(`/donate?project=${project.id}`)}
            className="bg-[#00b17b] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#009e6d] transition-colors"
          >
            Donate
          </button>
          <button
            onClick={() => router.push(`/projects/${project.id}`)}
            className="bg-[#fbb03b] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#e6a035] transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Right: Slider slides from RIGHT */}
      <div className="relative h-[450px] rounded-2xl overflow-hidden shadow-2xl">
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
      </div>
    </div>
  );
}
