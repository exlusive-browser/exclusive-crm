import { CssBaseline } from "@mui/material";
import { AppProvider } from "./providers/AppProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";
import Header from "./common-pages/Header";
import Subheader from "./common-pages/Subheader";

function App() {
  return (
    <AppProvider>
      <CssBaseline />
      <Header />      { }
      <Subheader />   { }
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;