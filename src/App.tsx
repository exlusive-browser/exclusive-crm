import { CssBaseline } from "@mui/material";
import { AppProvider } from "./providers/AppProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;
