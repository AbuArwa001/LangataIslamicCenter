"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string | null;
  images: { id: number; image: string }[];
}

export default function Campaigns() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`);
        if (res.ok) {
          const data = await res.json();
          // Filter for ongoing projects if needed, or just take the first few
          setProjects(data.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch projects", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="py-24 text-center">Loading campaigns...</div>;
  }

  if (projects.length === 0) {
    return null; // Or show a message
  }

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 group flex flex-col h-full"
            >
              <div className="h-72 bg-gray-200 relative">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={project.images[0].image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-10 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 line-clamp-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-8 line-clamp-3 flex-grow">
                  {project.description}
                </p>
                <Link
                  href={`/projects/${project.id}`}
                  className="w-full block bg-[#fbb03b] text-[#00b17b] py-4 rounded-2xl font-bold text-lg group-hover:bg-[#00b17b] group-hover:text-white transition-all"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
