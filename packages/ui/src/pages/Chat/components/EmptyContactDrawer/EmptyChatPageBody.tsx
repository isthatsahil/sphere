import Logo from "@/assets/logo.svg?react";
import { MoveLeft } from "lucide-react";
import styles from "./EmptyChatPageBody.module.css";

const EmptyChatPageBody = () => {
  return (
    <div className={styles.root}>
      {/* Ambient blobs — purely decorative, reduced motion respected */}
      <div className="chat-empty-blob-primary" aria-hidden="true" />
      <div className="chat-empty-blob-secondary" aria-hidden="true" />

      {/* Content */}
      <div className={styles.content}>
        {/* Logo halo */}
        <div className="auth-logo-halo">
          <Logo className="w-12 h-12 relative z-10" />
        </div>

        {/* Heading */}
        <div className={styles.headingGroup}>
          <h2 className={styles.heading}>
            Your space.
          </h2>
          <p className={styles.subtitle}>
            Open the menu to pick up where you left off, or start something new.
          </p>
        </div>

        {/* Hint arrow pointing to menu */}
        <div className={styles.hint}>
          <MoveLeft />
          <span className={styles.hintLabel}>
            conversations
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmptyChatPageBody;
