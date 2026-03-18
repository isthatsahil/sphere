import { create } from "zustand";
import type { User } from "@sphere/shared";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user
          ? {
              id: state.user.id,
              email: state.user.email,
              username: state.user.username,
              firstName: state.user.firstName,
              lastName: state.user.lastName,
              avatar: state.user.avatar,
              bio: state.user.bio,
              createdAt: state.user.createdAt,
            }
          : null,
      }),
    },
  ),
);
