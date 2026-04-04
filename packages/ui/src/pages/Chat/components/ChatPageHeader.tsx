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

interface Props {
  onMenuClick: () => void;
}

const ChatPageHeader = ({ onMenuClick }: Props) => {
  const { selectedChatData, closeChat } = useChatStore();
  const { mutate: logout } = useLogout();

  return (
    <header className="shrink-0 flex items-center gap-2.5 h-14 px-3 bg-background border-b border-border relative z-10">
      <Button
        variant="ghost"
        size="icon"
        className="size-8 rounded-full text-muted-foreground hover:text-foreground shrink-0"
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
        <AvatarFallback className="text-[0.65rem] font-bold text-white bg-[oklch(0.833_0.145_321.434)]">
          {getInitials(selectedChatData?.username)}
        </AvatarFallback>
        <AvatarBadge className="bg-green-600 dark:bg-green-800" />
      </Avatar>

      {/* Contact info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-black text-sm tracking-[-0.01em] leading-tight truncate text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)]">
          {selectedChatData?.username}
        </p>
        <p className="text-[0.65rem] text-emerald-500 font-medium leading-tight">
          online
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-0.5 shrink-0">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Video call"
        >
          <Video className="size-4.25" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
          aria-label="Voice call"
        >
          <Phone className="size-4.25" />
        </Button>
        <ThemeToggler />
        <Button
          variant="ghost"
          size="icon"
          className="size-8 rounded-full text-muted-foreground hover:text-foreground"
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
