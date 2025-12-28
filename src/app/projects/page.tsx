import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Heart, Share2, User } from "lucide-react";
import { fetchProjects } from "@/lib/api";

// Define interface for Project
interface Project {
  id: string;
  name: string;
  description: string;
  start_date: string;
  goal_amount: number;
  current_amount: number;
  status: string;
  image: string | null;
  total_donated?: number;
  progress_percentage?: number;
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await fetchProjects();
  } catch (error) {
    console.error("Failed to load projects", error);
  }

  // Fallback images since API might not have them yet
  const getProjectImage = (p: Project, index: number) => {
    if (p.image) return p.image;
    const placeholders = [
      "/about_1.jpg",
      "/building-render-placeholder.jpg",
      "/about_2.jpg",
    ];
    return placeholders[index % placeholders.length];
  };

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="flex flex-col min-h-screen bg-[#fdfdf8]">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-mosque.jpg"
            alt="Mosque Architecture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-serif tracking-tight drop-shadow-lg">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Building the future of our community, one brick at a time.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24 -mt-20 relative z-20">
        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-20">
            <h2 className="text-sm font-bold text-[#00b17b] uppercase tracking-widest mb-6 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-[#00b17b]"></span>
              Featured Project
            </h2>
            <Link
              href={`/projects/${featuredProject.id}`}
              className="group block relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <Image
                src={getProjectImage(featuredProject, 0)}
                alt={featuredProject.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full md:w-2/3 space-y-4">
                <div className="inline-block bg-[#00b17b] text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                  {featuredProject.status}
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white font-serif leading-tight group-hover:text-[#FFC06E] transition-colors">
                  {featuredProject.name}
                </h3>
                <p className="text-gray-300 text-lg line-clamp-2">
                  {featuredProject.description}
                </p>
                <div className="pt-4 flex items-center text-white font-bold text-sm tracking-wide uppercase">
                  View Details{" "}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {otherProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="block group h-full"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={getProjectImage(project, index + 1)}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-[#3d2616] shadow-sm">
                    {project.status}
                  </div>
                </div>

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#00b17b] uppercase tracking-wider mb-3">
                    <span>{project.start_date}</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#3d2616] mb-3 font-serif group-hover:text-[#00b17b] transition-colors">
                    {project.name}
                  </h3>

                  <div className="mb-4">
                    <div className="flex justify-between text-xs font-semibold text-gray-500 mb-1">
                      <span>{project.progress_percentage || 0}% Raised</span>
                      <span>
                        Goal: KES {project.goal_amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#00b17b] h-full rounded-full"
                        style={{
                          width: `${Math.min(
                            project.progress_percentage || 0,
                            100
                          )}%`,
                        }}
                      />
                    </div>
                  </div>

                  <p className="text-[#5c4033] mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between text-sm font-medium text-[#3d2616]">
                    <span className="group-hover:underline decoration-[#00b17b] decoration-2 underline-offset-4">
                      Read More
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#00b17b] transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Community Engagement Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Users,
              title: "Become a Volunteer",
              desc: "Join our dedicated team serving the community.",
            },
            {
              icon: Heart,
              title: "Make a Donation",
              desc: "Support our ongoing projects and initiatives.",
            },
            {
              icon: Share2,
              title: "Spread the Word",
              desc: "Help us reach more people by sharing our mission.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#00b17b] to-[#009e6d] p-8 rounded-2xl text-white text-center shadow-xl hover:-translate-y-1 transition-transform"
            >
              <item.icon className="w-12 h-12 mx-auto mb-6 text-[#FFC06E]" />
              <h3 className="text-xl font-bold mb-3 font-serif">
                {item.title}
              </h3>
              <p className="text-white/90 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
