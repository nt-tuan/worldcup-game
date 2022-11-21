import { useQueryClient } from "react-query";

export const useInvalidateBets = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries(["deals", "bet"]);
};
