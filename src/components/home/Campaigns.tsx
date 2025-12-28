import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string;
  image: string | null;
  images: { id: number; image: string }[];
}

async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return [];
  }
}

export default async function Campaigns() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-white text-center">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-5xl font-bold mb-4">
          <span className="text-[#fbb03b]">ONGOING</span>{" "}
          <span className="text-[#00b17b]">CAMPAIGNS</span>
        </h2>
        <div className="flex justify-center mb-12">
          <div className="h-1.5 w-20 bg-[#fbb03b]"></div>
          <div className="h-1.5 w-20 bg-[#00b17b]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
      </div>
    </section>
  );
}
