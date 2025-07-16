import { Skeleton } from "@/components/ui/skeleton";

export function ProductSkeleton() {
  return (
    <div className="flex py-1 bg-white border rounded">
      <div className="w-40 h-40 relative mr-2">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="w-[80%] flex flex-col">
        <Skeleton className="h-6 w-[80%] mb-2" />
        <Skeleton className="h-4 w-[95%] mb-3" />
        <Skeleton className="h-6 w-28 mb-2" />
        <Skeleton className="h-7 w-24 mt-auto mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-8" />
        </div>
      </div>

      <div className="flex flex-col items-end mr-2 my-1 w-[15%]">
        <Skeleton className="h-10 w-10 ml-auto mr-2 rounded-full" />
        <Skeleton className="h-8 w-20 mt-auto" />
      </div>
    </div>
  );
}
