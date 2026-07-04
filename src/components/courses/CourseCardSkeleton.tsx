import { Skeleton } from "../ui/Skeleton";

export function CourseCardSkeleton() {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border-card bg-white p-5">
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </article>
  );
}
