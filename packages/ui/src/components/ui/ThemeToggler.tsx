import { Sun, Moon } from "lucide-react";
import { Button } from "./button";
import { useThemeStore } from "@/stores/themeStore";
import styles from "./ThemeToggler.module.css";

const ThemeToggler = () => {
  const { theme, setTheme } = useThemeStore();
  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <Button
      variant={"ghost"}
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={styles.btn}
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
};

export default ThemeToggler;
