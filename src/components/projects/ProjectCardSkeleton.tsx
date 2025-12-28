import Skeleton from "@/components/ui/Skeleton";

export default function ProjectCardSkeleton() {
  return (
    <div className="rounded-[40px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col h-full">
      <Skeleton className="h-72 w-full" />
      <div className="p-10 flex flex-col flex-grow space-y-4">
        <Skeleton className="h-8 w-3/4" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <Skeleton className="h-14 w-full rounded-2xl mt-4" />
      </div>
    </div>
  );
}
