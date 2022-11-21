import "./App.css";

import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { colorSchemeEnum } from "./components/SwitchToggle";

import Home from "./pages/home";
import { useState } from "react";

import { MsalProvider } from "@azure/msal-react";

// MSAL imports
import { msalInstance } from "./utils/msal";

function App() {
  const [colorScheme, setColorScheme] = useState(colorSchemeEnum.DARK);

  const theme = {
    colorScheme: colorScheme,
    fontFamily: "'Nunito', sans-serif",
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MsalProvider instance={msalInstance}>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
          <Home />
        </MantineProvider>
      </MsalProvider>
    </QueryClientProvider>
  );
}

export default App;
