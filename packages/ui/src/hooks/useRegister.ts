import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { AxiosError } from "axios";
import type { ApiErrorResponse } from "@sphere/shared";
import { registerApi } from "@/lib/api/auth.api";
import { tokenStore } from "@/lib/tokenStore";
import { useAuthStore } from "@/stores/authStore";

export function useRegister() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: registerApi,
    onSuccess: ({ accessToken, user }) => {
      tokenStore.setAccessToken(accessToken);
      setUser(user);
      navigate("/chat");
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      console.error(
        "Registration error:",
        JSON.stringify(error.response?.data || error.message),
      );
      const message =
        error.response?.data?.message ||
        "Registration failed. Please try again.";
      toast.error(message);
    },
  });
}
