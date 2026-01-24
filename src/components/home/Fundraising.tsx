import { fetchProjects } from "@/lib/api";
import Link from "next/link";
import ImageSlider from "./ImageSlider";
import ProgressBar from "./ProgressBar";

export default async function Fundraising() {
  const projects = await fetchProjects().catch(() => []);
  const project = projects?.[0];

  if (!project) return null;

  const [firstName, ...restName] = project.name.split(" ");
  const images = project.images?.length > 0 
    ? project.images.map((img: { image: any; }) => img.image) 
    : [project.image || "/about_3.jpg"];

  return (
    <section className="py-24 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Static Content - Rendered on Server */}
          <div>
            <h2 className="text-4xl font-bold mb-6">
              <span className="text-[#fbb03b]">{firstName.toUpperCase()}</span>{" "}
              <span className="text-[#00b17b]">
                {restName.join(" ").toUpperCase()} FUNDRAISING PROGRESS
              </span>
            </h2>
            <p className="text-gray-600 italic mb-8 text-lg">
              "Whoever builds a mosque for the sake of Allah, Allah will build for him a house in Paradise"
            </p>

            <div className="mb-10">
              <p className="text-xl font-bold mb-4">
                <span className="text-[#fbb03b]">KSh {project.total_donated.toLocaleString()}</span>
                <span className="text-gray-400 font-normal"> of </span>
                <span className="text-[#c1272d]">KSh {project.goal_amount.toLocaleString()}</span> raised
              </p>
              
              {/* Dynamic Progress Bar */}
              <ProgressBar percentage={project.progress_percentage} />
            </div>

            <div className="flex gap-4">
              <Link href={`/donate?project=${project.id}`} className="bg-[#00b17b] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#009e6d]">
                Donate
              </Link>
              <Link href={`/projects/${project.id}`} className="bg-[#fbb03b] text-white px-10 py-3 rounded-2xl font-bold hover:bg-[#e6a035]">
                Learn More
              </Link>
            </div>
          </div>

          {/* Dynamic Image Slider */}
          <ImageSlider images={images} />
        </div>
      </div>
    </section>
  );
}