import { AspectRatio, Badge, Card, Text, Title } from "@mantine/core";

import { formatDate } from "../utils/format";

const Status = ({ status }) => {
  if (status === "ACTIVE")
    return (
      <Badge
        variant="gradient"
        gradient={{ from: "teal", to: "lime", deg: 105 }}
      >
        Đang diễn ra
      </Badge>
    );
  if (status === "CANCELED")
    return (
      <Badge variant="gradient" gradient={{ from: "orange", to: "red" }}>
        Đã huỷ
      </Badge>
    );
  return <Badge>Trạng thái không xác định</Badge>;
};

const DealInfo = ({ data }) => {
  return (
    <Card
      withBorder
      radius="md"
      p="md"
      component="a"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <AspectRatio ratio={1920 / 1080}>
        <div>frame</div>
      </AspectRatio>
      <Status status={data?.status} />
      <Text color="dimmed" size="xs" weight={700} mt="xs">
        Start: {formatDate(data?.startDate) || "-"} - End:{" "}
        {formatDate(data?.closeDate) || "-"}
      </Text>

      <Title
        variant="gradient"
        gradient={{ from: "indigo", to: "cyan", deg: 45 }}
        order={3}
      >
        {data?.title}
      </Title>
    </Card>
  );
};

export default DealInfo;
