import { fetchProjects, fetchProject } from "@/lib/api";
import { User, HandHeart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/projects/ProjectGallery";

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
  images: { id: number; image: string }[];
  total_donated?: number;
  progress_percentage?: number;
}

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const project = await fetchProject(id);
    if (!project) return { title: "Project Not Found" };

    return {
      title: `${project.name} | Langata Islamic Center`,
      description: project.description?.substring(0, 160) || "",
      openGraph: {
        title: project.name,
        description: project.description?.substring(0, 160) || "",
        images: project.image ? [project.image] : ["/logo.png"],
      },
    };
  } catch (e) {
    return { title: "Project | Langata Islamic Center" };
  }
}

export async function generateStaticParams() {
  try {
    const projects = await fetchProjects();
    console.log(projects);
    return projects.map((project: Project) => ({
      id: project.id,
    }));
  } catch (e) {
    console.error("Failed to generate static params", e);
    return [];
  }
}

import DonationModal from "@/components/donation/DonationModal";

export default async function SingleProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project: Project | null = null;

  try {
    project = await fetchProject(id);
  } catch (e) {
    console.error("Failed to fetch project", e);
  }

  if (!project) {
    notFound();
  }

  const progress =
    project.progress_percentage ??
    (project.goal_amount
      ? (project.current_amount / project.goal_amount) * 100
      : 0);
  const raisedAmount = project.total_donated ?? project.current_amount;
  const image = project.image || "/about_1.jpg";

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero / Header Image */}
      <section className="relative h-[50vh] min-h-[400px]">
        <Image
          src={image}
          alt={project.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center px-4 drop-shadow-lg font-serif">
            {project.name}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Meta Data */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground uppercase tracking-wider font-medium border-b pb-8">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                ADMIN
              </div>
              <span>•</span>
              <span>{project.start_date}</span>
            </div>

            {/* Description */}
            <div className="prose prose-lg max-w-none text-[#5c4033] leading-relaxed">
              {project.description?.startsWith("<") ? (
                <div
                  dangerouslySetInnerHTML={{ __html: project.description }}
                />
              ) : (
                <div className="whitespace-pre-wrap">
                  {project.description || ""}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Donation Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl shadow-xl p-8 space-y-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-[#3d2616] font-serif">
                  Support this Project
                </h3>

                {project.goal_amount && (
                  <>
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Raised
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          KES {raisedAmount.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground font-medium">
                          Goal
                        </p>
                        <p className="text-lg font-semibold text-[#3d2616]">
                          KES {project.goal_amount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center text-sm text-muted-foreground pt-2">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">0 Donors</span>
                </div>
              </div>

              <DonationModal
                projectId={project.id}
                projectName={project.name}
                trigger={
                  <button className="block w-full bg-[#00b17b] hover:bg-[#009e6d] text-white text-center py-4 rounded-xl font-bold text-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center">
                    <HandHeart className="w-5 h-5 mr-2" />
                    Donate Now
                  </button>
                }
              />

              <div className="bg-orange-50 rounded-xl p-4 text-sm text-[#5c4033]">
                <p className="font-medium mb-1">Why donate?</p>
                <p>
                  Your contribution directly supports the completion of this
                  project and benefits the entire community.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Gallery Section */}
        <div className="space-y-8 pt-12 border-t mt-12">
          <h3 className="text-3xl font-bold text-center text-[#3d2616] font-serif">
            Project Gallery
          </h3>
          <ProjectGallery images={project.images} projectName={project.name} />
        </div>
      </div>
    </div>
  );
}
