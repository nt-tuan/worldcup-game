import { useIsAuthenticated } from "@azure/msal-react";
import { Button } from "@mantine/core";
import React from "react";
import { useLogin } from "./useAuth";

export const Login = () => {
  const isAuthenticated = useIsAuthenticated();
  const { onLogin, redirect } = useLogin();

  React.useEffect(() => {
    if (isAuthenticated) {
      onLogin();
    }
  }, [isAuthenticated, onLogin]);

  return (
    <Button loading={isAuthenticated} onClick={redirect}>
      Login
    </Button>
  );
};
