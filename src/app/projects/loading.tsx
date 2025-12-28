import ProjectCardSkeleton from "@/components/projects/ProjectCardSkeleton";
import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="relative z-10 text-center">
          <Skeleton className="h-16 w-64 mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
