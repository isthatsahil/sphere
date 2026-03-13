import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/index.tsx";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
