import { useAuthStore } from "@/stores/authStore";
import { Navigate, Outlet } from "react-router";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
