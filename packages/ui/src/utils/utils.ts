import type { ThemeType } from "@/types/themes";

export function applyTheme(theme: ThemeType) {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");
  if (theme === "auto") {
    root.classList.add(
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    );
    return;
  }
  root.classList.add(theme);
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
