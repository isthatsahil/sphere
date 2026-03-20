import type { ThemeType } from "@/types/themes";
import { applyTheme } from "@/utils/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ITheme {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const useThemeStore = create<ITheme>()(
  persist(
    (set) => ({
      theme: "auto",
      setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
      },
    }),
    {
      name: "ui-theme",
    },
  ),
);
