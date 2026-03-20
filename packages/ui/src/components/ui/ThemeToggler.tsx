import { Sun, Moon } from "lucide-react";
import { Button } from "./button";
import { useThemeStore } from "@/stores/themeStore";

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
      className="size-8 rounded-full flex items-center justify-center text-[oklch(0.50_0.04_322)] dark:text-[oklch(0.55_0.04_322)] hover:bg-[oklch(0.955_0.018_320)] dark:hover:bg-[oklch(0.22_0.04_320)] transition-colors"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </Button>
  );
};

export default ThemeToggler;
