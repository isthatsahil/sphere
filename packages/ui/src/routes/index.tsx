import { Routes, Route } from "react-router";
import { routes } from "./routes";

export default function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route?.path} path={route?.path} element={route?.element} />
      ))}
    </Routes>
  );
}