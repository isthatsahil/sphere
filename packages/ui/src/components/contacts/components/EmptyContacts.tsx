import { Search } from "lucide-react";
import styles from "./EmptyContacts.module.css";

function EmptyContactsDialog() {
  return (
    <div className={styles.root}>
      <div className={styles.iconWrapper}>
        <Search className={styles.icon} />
      </div>
      <p className={styles.title}>No matches</p>
      <p className={styles.subtitle}>
        Try a different name or username
      </p>
    </div>
  );
}

export default EmptyContactsDialog;
