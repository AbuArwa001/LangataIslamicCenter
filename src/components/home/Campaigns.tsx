import Link from "next/link";
import { stripHtml } from "@/lib/htmlUtils";
import CampaignCard from "./CampaignCard";

interface Project {
  id: string;
  name: string;
  description: string;
  goal_amount: number;
  total_donated: number;
  progress_percentage: number;
  image: string | null;
  images: { id: number; image: string }[];
}

async function getProject(): Promise<Project | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data && data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Failed to fetch project", error);
    return null;
  }
}

export default async function Campaigns() {
  const project = await getProject();

  if (!project) {
    return null;
  }

  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-4">
          <span className="text-[#fbb03b]">FEATURED</span>{" "}
          <span className="text-[#00b17b]">INITIATIVE</span>
        </h2>
        <div className="flex justify-center mb-16">
          <div className="h-1.5 w-20 bg-[#fbb03b]"></div>
          <div className="h-1.5 w-20 bg-[#00b17b]"></div>
        </div>

        <CampaignCard project={project} />

        <div className="mt-16">
          <Link
            href="/projects"
            className="text-[#00b17b] font-bold hover:underline flex items-center justify-center gap-2"
          >
            See All Our Projects & Facilities
            <span className="text-2xl">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
