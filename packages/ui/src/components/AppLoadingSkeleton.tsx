import { Skeleton } from "@/components/ui/skeleton";
import styles from "./AppLoadingSkeleton.module.css";

export function AppLoadingSkeleton() {
  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.header}>
        <Skeleton className="size-8 rounded-full shrink-0" />
        <Skeleton className="size-8 rounded-full shrink-0" />
        <div className={styles.headerInfo}>
          <Skeleton className="h-3 w-28 rounded" />
          <Skeleton className="h-2.5 w-10 rounded" />
        </div>
        <div className={styles.headerActions}>
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
          <Skeleton className="size-8 rounded-full" />
        </div>
      </div>

      {/* Message bubbles */}
      <div className={styles.messageArea}>
        <div className={styles.msgRowIncoming}>
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-10 w-48 rounded-2xl rounded-bl-sm" />
        </div>
        <div className={styles.msgRowOutgoing}>
          <Skeleton className="h-10 w-56 rounded-2xl rounded-br-sm" />
        </div>
        <div className={styles.msgRowIncoming}>
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-16 w-64 rounded-2xl rounded-bl-sm" />
        </div>
        <div className={styles.msgRowOutgoing}>
          <Skeleton className="h-10 w-40 rounded-2xl rounded-br-sm" />
        </div>
        <div className={styles.msgRowIncoming}>
          <Skeleton className="size-7 rounded-full shrink-0" />
          <Skeleton className="h-10 w-52 rounded-2xl rounded-bl-sm" />
        </div>
      </div>

      {/* Footer input */}
      <div className={styles.footer}>
        <Skeleton className="size-8 rounded-full shrink-0" />
        <Skeleton className="flex-1 h-10 rounded-full" />
        <Skeleton className="size-8 rounded-full shrink-0" />
      </div>
    </div>
  );
}
