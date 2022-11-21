import { Button } from "@mantine/core";
import { useLogin } from "./useAuth";

export const Login = () => {
  const { onLogin } = useLogin();
  return <Button onClick={onLogin}>Login</Button>;
};
