import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/index.tsx";
import { useMountEffect } from "./hooks/useMountEffect.ts";
import { applyTheme } from "./utils/utils.ts";
import { useThemeStore } from "./stores/themeStore.ts";

function App() {
  const { theme } = useThemeStore();
  useMountEffect(() => applyTheme(theme));
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
