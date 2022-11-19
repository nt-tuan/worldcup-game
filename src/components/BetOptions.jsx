import {
  ActionIcon,
  Box,
  Button,
  Card,
  Center,
  Collapse,
  Flex,
  Loader,
  Notification,
  Space,
  Title,
} from "@mantine/core";
import { IconChevronDown, IconChevronUp, IconSend } from "@tabler/icons";

import BetSlider from "./BetSlider";
import { useState } from "react";

const gradientMaps = {
  0: { from: "teal", to: "lime", deg: 105 },
  1: { from: "orange", to: "red" },
  2: { from: "indigo", to: "cyan" },
  3: { from: "teal", to: "blue", deg: 60 },
  4: { from: "#ed6ea0", to: "#ec8c69", deg: 35 },
  5: { from: "indigo", to: "cyan" },
  6: { from: "teal", to: "lime", deg: 105 },
  7: { from: "teal", to: "blue", deg: 60 },
  8: { from: "orange", to: "red" },
  9: { from: "#ed6ea0", to: "#ec8c69", deg: 35 },
};

function BetOption({ option, index }) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Space h="md" />
      <Card withBorder radius="md">
        <Title variant="gradient" gradient={gradientMaps[index]} order={3}>
          {option?.title}
        </Title>
        <Collapse in={opened}>
          <Flex></Flex>
          <Space h="xl" />
          <BetSlider />
          <Space h="xl" />
          <Button
            radius="md"
            w="100%"
            variant="gradient"
            gradient={{ from: "blue", to: "teal", deg: 60 }}
            leftIcon={<IconSend />}
          >
            Chốt
          </Button>
        </Collapse>
        <Space h="md" />
        <Flex justify="center" onClick={() => setOpened((o) => !o)}>
          <ActionIcon>
            {opened ? (
              <IconChevronUp size={18} />
            ) : (
              <IconChevronDown size={18} />
            )}
          </ActionIcon>
        </Flex>
      </Card>
    </>
  );
}

function ContenBuilder({ options = [] }) {
  if (options?.length === 0) return <Title order={3}>Quay lại sau nhé!</Title>;
  return (
    <>
      {options.map((option, index) => (
        <BetOption key={`${option.id}${index}`} index={index} option={option} />
      ))}
    </>
  );
}

function BetOptions({ isLoading, data }) {
  return (
    <Box>
      {/* <Notification title="Default notification">
        Đặt lệnh thành công
      </Notification> */}
      <Title order={3} c="gray.7">
        Deals
      </Title>
      <Box>
        {isLoading && (
          <Center h={300}>
            <Loader size="md" />
          </Center>
        )}
        {!isLoading && <ContenBuilder options={data} />}
      </Box>
    </Box>
  );
}

export default BetOptions;
