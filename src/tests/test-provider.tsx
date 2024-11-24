import CssBaseline from "@mui/material/CssBaseline";
import { AppProvider } from "../providers/AppProvider";
import { MemoryRouter } from "react-router-dom";

export interface ProviderWrapperProps {
  children: React.ReactNode;
}

export function ProviderWrapper({ children }: ProviderWrapperProps) {
  return (
    <AppProvider>
      <CssBaseline />
      <MemoryRouter>{children}</MemoryRouter>
    </AppProvider>
  );
}
