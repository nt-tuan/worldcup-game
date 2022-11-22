import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@mantine/core";
import React from "react";
import { useLogin } from "./useAuth";

export const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const { onLogin, redirect } = useLogin();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      setLoading(true);
      onLogin().finally(() => setLoading(false));
    }
  }, [isAuthenticated, onLogin]);

  return (
    <Button loading={isAuthenticated || loading} onClick={redirect}>
      Login
    </Button>
  );
};
