import { AspectRatio, Badge, Card, Text, Title, Box } from "@mantine/core";

import { formatDate } from "../utils/format";

const Status = ({ status, closeDate }) => {
  console.log({ closeDate });
  if (closeDate && new Date(closeDate).getTime() < new Date().getTime()) {
    return (
      <Badge variant="gradient" gradient={{ from: "orange", to: "red" }}>
        Đã đóng
      </Badge>
    );
  }

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
      p="0"
      component="a"
      sx={(theme) => ({
        position: "relative",
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      })}
    >
      <AspectRatio ratio={1920 / 1080} style={{ overflow: "hidden" }}>
        <img
          width="100%"
          height="100%"
          src={data?.infoSource}
          style={{ opacity: 0.4 }}
        />
      </AspectRatio>
      <Box
        p="md"
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "#212529aa",
        }}
      >
        <Status status={data?.status} closeDate={data?.closeDate} />
        <Text color="gray.1" size="xs" weight={700} mt="xs">
          Start: {formatDate(data?.startDate) || "-"} - End:{" "}
          {formatDate(data?.closeDate) || "-"}
        </Text>
        <Title
          variant="gradient"
          gradient={{ from: "indigo.1", to: "cyan.1", deg: 45 }}
          order={3}
        >
          {data?.title}
        </Title>
      </Box>
    </Card>
  );
};

export default DealInfo;
