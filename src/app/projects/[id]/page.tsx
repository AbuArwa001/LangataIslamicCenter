
import { fetchProjects, fetchProject } from "@/lib/api";
import { User, HandHeart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectDescription from "@/components/projects/ProjectDescription";
import LiveDonationProgress from "@/components/projects/LiveDonationProgress";

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
  total_donors?: number;
  progress_percentage?: number;
}

import { stripHtml } from "@/lib/htmlUtils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  try {
    const project = await fetchProject(id);
    if (!project) return { title: "Project Not Found" };

    const cleanDescription = stripHtml(project.description || "");

    return {
      title: `${project.name} | Langata Islamic Center`,
      description: cleanDescription.substring(0, 160),
      openGraph: {
        title: project.name,
        description: cleanDescription.substring(0, 160),
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
    // console.log(projects);
    if (!Array.isArray(projects)) return [];
    return projects.map((project: Project) => ({
      id: project.id,
    }));
  } catch (e) {
    console.error("Failed to generate static params", e);
    return [];
  }
}

import DonationModal from "@/components/donation/DonationModal";
import { Metadata } from "next";

export default async function SingleProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let project: Project | null = await fetchProject(id).catch(() => null);

  if (!project) notFound();

  const initialStats = {
    id: project.id,
    goal_amount: project.goal_amount,
    current_amount: project.current_amount,
    total_donated: project.total_donated,
    total_donors: project.total_donors,
    progress_percentage: project.progress_percentage,
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* ... Hero Section remains exactly as you had it ... */}

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
             <ProjectDescription description={project.description} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-gray-100 rounded-2xl shadow-xl p-8 space-y-8">
              <h3 className="text-2xl font-bold text-[#3d2616] font-serif">
                Support this Project
              </h3>

              {/* LIVE SECTION REPLACES OLD STATIC CODE */}
              <LiveDonationProgress initialData={initialStats} />

              <DonationModal
                projectId={project.id}
                projectName={project.name}
                trigger={
                  <button className="block w-full bg-[#00b17b] hover:bg-[#009e6d] text-white text-center py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center">
                    <HandHeart className="w-5 h-5 mr-2" />
                    Donate Now
                  </button>
                }
              />
              {/* ... rest of the sidebar ... */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
