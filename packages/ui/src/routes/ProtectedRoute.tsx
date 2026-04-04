import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { tokenStore } from "@/lib/tokenStore";
import { refreshApi } from "@/lib/api/auth.api";
import { Navigate, Outlet } from "react-router";
import { useMountEffect } from "@/hooks/useMountEffect";
import { AppLoadingSkeleton } from "@/components/AppLoadingSkeleton";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!tokenStore.getAccessToken()) return <TokenBootstrap />;
  return <Outlet />;
}

function TokenBootstrap() {
  const { clearUser } = useAuthStore();
  const [ready, setReady] = useState(false);

  useMountEffect(() => {
    refreshApi()
      .then((accessToken) => tokenStore.setAccessToken(accessToken))
      .catch(() => clearUser())
      .finally(() => setReady(true));
  });

  if (!ready) return <AppLoadingSkeleton />;
  return <Outlet />;
}
