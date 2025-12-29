import { fetchProjects } from "@/lib/api";
import FundraisingClient from "./FundraisingClient";

export default async function Fundraising() {
  const projects = await fetchProjects().catch(() => []);
  const firstProject = projects && projects.length > 0 ? projects[0] : null;

  if (!firstProject) return null;

  return (
    <section className="py-24 bg-[#f9f9f9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FundraisingClient project={firstProject} />
      </div>
    </section>
  );
}
