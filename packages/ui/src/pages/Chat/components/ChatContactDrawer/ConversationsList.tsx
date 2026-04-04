import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import styles from "./ConversationsList.module.css";

interface Conversation {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  initials: string;
  color: string;
}

interface Props {
  conversations: Conversation[];
  onClose: () => void;
}

const ConversationsList = ({ conversations, onClose }: Props) => {
  return (
    <ScrollArea className="flex-1 overflow-y-auto">
      <div className={styles.list}>
        {conversations.map((conv, index) => (
          <div key={conv.id}>
            <Button
              variant="ghost"
              onClick={onClose}
              className={`${styles.conversationBtn} ${conv.id === "1" ? styles.conversationBtnActive : ""}`}
            >
              <Avatar size="default" className={styles.avatar}>
                <AvatarImage src={conv.initials} />
                <AvatarFallback className="text-xs font-bold">
                  {conv.initials}
                </AvatarFallback>
                <AvatarBadge
                  className={
                    conv.online
                      ? "bg-green-600 dark:bg-green-800"
                      : "bg-gray-400 dark:bg-gray-600"
                  }
                />
              </Avatar>

              {/* Content */}
              <div className={styles.content}>
                <div className={styles.contentHeader}>
                  <span className={conv.unread > 0 ? styles.nameUnread : styles.nameRead}>
                    {conv.name}
                  </span>
                  <span className={conv.unread > 0 ? styles.timeUnread : styles.timeRead}>
                    {conv.time}
                  </span>
                </div>
                <div className={styles.contentBody}>
                  <span className={conv.unread > 0 ? styles.lastMsgUnread : styles.lastMsgRead}>
                    {conv.lastMsg}
                  </span>
                  {conv.unread > 0 && (
                    <span className={styles.unreadBadge}>
                      {conv.unread}
                    </span>
                  )}
                </div>
              </div>
            </Button>
            {index < conversations.length - 1 && (
              <Separator className="mx-4 w-auto opacity-50" />
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ConversationsList;
