import { lazy } from "react";
import { Navigate } from "react-router";

const Auth = lazy(() => import("../pages/Auth/index.tsx"));
const ChatPage = lazy(() => import("../pages/Chat/index.tsx"));

export const routes = [
  { path: "/login", element: <Auth /> },
  { path: "/chat", element: <ChatPage /> },
  { path: "*", element: <Navigate replace to="/login" /> },
];
