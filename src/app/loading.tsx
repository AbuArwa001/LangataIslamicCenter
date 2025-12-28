import Skeleton from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Skeleton */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <Skeleton className="absolute inset-0" />
      </div>

      <div className="container mx-auto px-4 py-20 max-w-7xl space-y-12">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-8">
            <Skeleton className="h-12 w-1/2" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <Skeleton className="h-[600px] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
