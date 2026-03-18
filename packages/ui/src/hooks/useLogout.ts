import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@sphere/shared";
import { logoutApi } from "@/lib/api/auth.api";
import { tokenStore } from "@/lib/tokenStore";
import { useAuthStore } from "@/stores/authStore";

export function useLogout() {
  const navigate = useNavigate();
  const { clearUser } = useAuthStore();

  return useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      tokenStore.clearAccessToken();
      clearUser();
      navigate("/login");
      toast.success("Logged out successfully.");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error(
        "Logout error:",
        JSON.stringify(error.response?.data || error.message),
      );
      const message =
        error.response?.data?.message || "Logout failed. Please try again.";
      toast.error(message);
    },
  });
}
