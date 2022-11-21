import { Text } from "@mantine/core";

export const Amount = ({ amount }) => {
  return (
    <Text span c="white">
      <b>
        {amount ?? "-"}
        <span>🍺</span>
      </b>
    </Text>
  );
};
