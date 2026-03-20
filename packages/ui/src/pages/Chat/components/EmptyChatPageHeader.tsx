import Logo from "@/assets/logo.svg?react";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";

interface Props {
  onMenuClick: () => void;
}

const EmptyChatPageHeader = ({ onMenuClick }: Props) => {
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

      {/* App branding */}
      <div className="flex items-center gap-2 flex-1 min-w-0">
        <Logo className="w-6 h-6 shrink-0" />
        <span className="font-display font-black text-[0.9rem] tracking-[-0.01em] text-[oklch(0.22_0.06_322)] dark:text-[oklch(0.88_0.02_322)]">
          Sphere
        </span>
      </div>

      {/* Utility actions only — no contact-specific actions */}
      <div className="flex items-center gap-0.5 shrink-0">
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

export default EmptyChatPageHeader;
