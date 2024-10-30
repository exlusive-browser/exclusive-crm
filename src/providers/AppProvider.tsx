import { ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../styles/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SnackbarProvider } from "notistack";

interface AppProviderProps {
  children: React.ReactNode;
}

// Create a client
const queryClient = new QueryClient();

export function AppProvider({ children }: AppProviderProps) {
  return (
    <SnackbarProvider>
      <ThemeProvider theme={muiTheme}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
}
