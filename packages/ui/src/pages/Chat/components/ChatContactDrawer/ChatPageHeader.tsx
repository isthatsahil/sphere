import ThemeToggler from "@/components/ui/ThemeToggler";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Video, LogOut } from "lucide-react";
import { useChatStore } from "@/stores/chatStore";
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { getInitials } from "@/utils/utils";
import styles from "./ChatPageHeader.module.css";

interface Props {
  onMenuClick: () => void;
}

const ChatPageHeader = ({ onMenuClick }: Props) => {
  const { selectedChatData, closeChat } = useChatStore();
  const { mutate: logout } = useLogout();

  return (
    <header className={styles.header}>
      <Button
        variant="ghost"
        size="icon"
        className={styles.menuBtn}
        onClick={onMenuClick}
        aria-label="Open conversations"
      >
        <Menu className="size-4.5" />
      </Button>

      {/* Contact avatar */}
      <Avatar onClick={closeChat}>
        <AvatarImage
          src={selectedChatData?.avatar}
          alt="user avatar"
          className="grayscale"
        />
        <AvatarFallback className={styles.avatarFallback}>
          {getInitials(selectedChatData?.username)}
        </AvatarFallback>
        <AvatarBadge className={styles.avatarBadge} />
      </Avatar>

      {/* Contact info */}
      <div className={styles.contactInfo}>
        <p className={styles.contactName}>
          {selectedChatData?.username}
        </p>
        <p className={styles.contactStatus}>
          online
        </p>
      </div>

      {/* Actions */}
      <div className={styles.actions}>
        <Button
          variant="ghost"
          size="icon"
          className={styles.actionBtn}
          aria-label="Video call"
        >
          <Video className="size-4.25" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={styles.actionBtn}
          aria-label="Voice call"
        >
          <Phone className="size-4.25" />
        </Button>
        <ThemeToggler />
        <Button
          variant="ghost"
          size="icon"
          className={styles.actionBtn}
          onClick={() => logout()}
          aria-label="Log out"
        >
          <LogOut className="size-4.25" />
        </Button>
      </div>
    </header>
  );
};

export default ChatPageHeader;
