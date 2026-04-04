import Logo from "@/assets/logo.svg?react";
import ThemeToggler from "@/components/ui/ThemeToggler";
import { useLogout } from "@/hooks/useLogout";
import { Button } from "@/components/ui/button";
import { Menu, LogOut } from "lucide-react";
import styles from "./EmptyChatPageHeader.module.css";

interface Props {
  onMenuClick: () => void;
}

const EmptyChatPageHeader = ({ onMenuClick }: Props) => {
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

      {/* App branding */}
      <div className={styles.branding}>
        <Logo className={styles.logo} />
        <span className={styles.brandName}>
          Sphere
        </span>
      </div>

      {/* Utility actions only — no contact-specific actions */}
      <div className={styles.actions}>
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

export default EmptyChatPageHeader;
