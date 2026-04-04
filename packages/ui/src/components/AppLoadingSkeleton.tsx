import { Skeleton } from "@/components/ui/skeleton";

export function AppLoadingSkeleton() {
  return (
    <div className="flex flex-col h-dvh bg-background overflow-hidden">
      {/* Header */}
      <div className="shrink-0 flex items-center gap-2.5 h-14 px-3 border-b border-border">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className="flex-1 flex flex-col gap-1.5 min-w-0">
          <Skeleton className="h-3 w-28 rounded" />
          <Skeleton className="h-2.5 w-10 rounded" />
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>

      {/* Message bubbles */}
      <div className="flex-1 flex flex-col gap-3 px-4 py-5 overflow-hidden">
        <div className="flex items-end gap-2 max-w-[72%]">
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-10 w-48 rounded-2xl rounded-bl-sm" />
        </div>
        <div className="flex items-end gap-2 max-w-[72%] self-end flex-row-reverse">
          <Skeleton className="h-10 w-56 rounded-2xl rounded-br-sm" />
        </div>
        <div className="flex items-end gap-2 max-w-[72%]">
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-16 w-64 rounded-2xl rounded-bl-sm" />
        </div>
        <div className="flex items-end gap-2 max-w-[72%] self-end flex-row-reverse">
          <Skeleton className="h-10 w-40 rounded-2xl rounded-br-sm" />
        </div>
        <div className="flex items-end gap-2 max-w-[72%]">
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-10 w-52 rounded-2xl rounded-bl-sm" />
        </div>
      </div>

      {/* Footer input */}
      <div className="shrink-0 flex items-center gap-2 px-3 py-3 border-t border-border">
        <Skeleton className="size-8 rounded-full shrink-0" />
        <Skeleton className="flex-1 h-10 rounded-full" />
        <Skeleton className="size-8 rounded-full shrink-0" />
      </div>
    </div>
  );
}
