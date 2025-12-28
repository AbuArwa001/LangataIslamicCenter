import Skeleton from "@/components/ui/Skeleton";

export default function ProjectDetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#fdfdf8]">
      {/* Hero Skeleton */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <Skeleton className="h-16 w-3/4 mx-auto" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="flex flex-wrap gap-6 mb-10">
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-32 rounded-full" />
                <Skeleton className="h-10 w-32 rounded-full" />
              </div>
              <div className="space-y-6">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-2/3" />
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <Skeleton className="h-8 w-1/2 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
