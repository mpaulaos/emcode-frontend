import { Skeleton } from "../ui/Skeleton";

export function GuideCardSkeleton() {
  return (
    <div className="flex flex-row items-center gap-5 rounded-2xl border border-border-card bg-surface-primary p-5">
      <Skeleton className="h-16 w-16 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-1">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
