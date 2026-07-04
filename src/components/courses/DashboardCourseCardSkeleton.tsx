import { Skeleton } from "../ui/Skeleton";

export function DashboardCourseCardSkeleton() {
  return (
    <article className="h-full overflow-hidden rounded-2xl bg-surface-primary">
      <Skeleton className="aspect-video w-full rounded-t-2xl" />
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    </article>
  );
}
