import "./App.css";

import { Container, Flex, MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "react-query";
import { SwitchToggle, colorSchemeEnum } from "./components/SwitchToggle";

import Home from "./pages/home";
import { useState } from "react";

function App() {
  const [colorScheme, setColorScheme] = useState(colorSchemeEnum.LIGHT);

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
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <Container>
          <Flex gap="sm" justify="flex-end" align="center">
            <SwitchToggle
              colorScheme={colorScheme}
              toggleColorScheme={setColorScheme}
            />
          </Flex>
          <Home />
        </Container>
      </MantineProvider>
    </QueryClientProvider>
  );
}

export default App;
