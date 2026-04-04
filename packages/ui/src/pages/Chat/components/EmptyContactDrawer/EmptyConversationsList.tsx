import DialogContainer from "@/components/contacts/DialogContainer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import styles from "./EmptyConversationsList.module.css";

type EmptyConversationsDrawerProp = {
  onClose: () => void;
};
const EmptyConversationsDrawer = ({
  onClose,
}: EmptyConversationsDrawerProp) => {
  return (
    <div className={styles.root}>
      {/* Abstract chat-bubble illustration */}
      <div className={styles.illustration} aria-hidden="true">
        {/* Back bubble */}
        <div className={styles.bubbleBack} />
        {/* Mid bubble */}
        <div className={styles.bubbleMid} />
        {/* Front bubble */}
        <div className={styles.bubbleFront} />
      </div>
      <h3 className={styles.heading}>
        No conversations yet
      </h3>
      <p className={styles.subtitle}>
        Start one and it'll live here. Your people are waiting.
      </p>
      <DialogContainer
        onClose={onClose}
        trigger={(open) => (
          <Button
            size="sm"
            onClick={open}
            className={styles.newConversationBtn}
          >
            <Plus className="size-3.5" />
            New conversation
          </Button>
        )}
      />
    </div>
  );
};

export default EmptyConversationsDrawer;
