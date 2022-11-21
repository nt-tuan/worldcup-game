import { useMsal } from "@azure/msal-react";
import { Chip } from "@mantine/core";

export const UserProfile = () => {
  const { instance } = useMsal();
  const firstAccount = instance.getActiveAccount();
  return <Chip>{firstAccount?.name ?? "-"}</Chip>;
};
