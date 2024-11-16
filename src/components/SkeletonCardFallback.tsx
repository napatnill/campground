import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonCardFallback({ count }: { count: number }) {
  return (
    <div className="flex flex-wrap justify-center gap-6 mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-96 rounded-lg overflow-hidden shadow-lg transform transition duration-300 cursor-pointer"
        >
          {/* Skeleton Image */}
          <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700">
            <Skeleton className="w-full h-full" />
          </div>
          {/* Skeleton Content */}
          <div className="p-4 bg-white dark:bg-primary-foreground">
            <Skeleton className="h-6 w-3/4 mb-2" />
          </div>
        </div>
      ))}
    </div>
  );
}
