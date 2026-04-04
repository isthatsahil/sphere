import { Skeleton } from "./ui/skeleton";
import styles from "./ListSkeleton.module.css";

const ListSkeleton = ({ arrayLength }: { arrayLength: number }) => {
  return (
    <>
      {[...Array(arrayLength)].map((_, i) => (
        <div className={styles.item} key={i}>
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className={styles.textGroup}>
            <Skeleton className="h-4 w-62.5" />
            <Skeleton className="h-4 w-50" />
          </div>
        </div>
      ))}
    </>
  );
};

export default ListSkeleton;
