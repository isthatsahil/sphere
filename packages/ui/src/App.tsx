import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/index.tsx";
import { useMountEffect } from "./hooks/useMountEffect.ts";
import { applyTheme } from "./utils/utils.ts";
import { useThemeStore } from "./stores/themeStore.ts";
import { ErrorBoundary } from "./components/ErrorBoundary.tsx";

function App() {
  const { theme } = useThemeStore();
  useMountEffect(() => applyTheme(theme));
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
