import ThemeToggler from "@/components/ui/ThemeToggler";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Menu, Phone, Video, LogOut } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

const ChatPageHeader = ({ onMenuClick }: Props) => {
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
      <div className="relative shrink-0">
        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-[oklch(0.833_0.145_321.434)]">
          <span className="text-[0.65rem] font-bold text-white">SC</span>
        </div>
        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-background" />
      </div>

      {/* Contact info */}
      <div className="flex-1 min-w-0">
        <p className="font-display font-black text-sm tracking-[-0.01em] leading-tight truncate text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)]">
          Sarah Chen
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
