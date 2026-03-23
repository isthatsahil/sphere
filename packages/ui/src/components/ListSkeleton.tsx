import { Skeleton } from "./ui/skeleton";

const ListSkeleton = ({ arrayLength }: { arrayLength: number }) => {
  return (
    <>
      {[...Array(arrayLength)].map((_, i) => (
        <div className="flex items-center gap-4">
          <Skeleton key={i} className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-50" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListSkeleton;
