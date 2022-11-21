import React from "react";
import { useAccount, useMsalAuthentication } from "@azure/msal-react";
import {
  Collapse,
  LoadingOverlay,
  List,
  ThemeIcon,
  Title,
  Flex,
  Space,
  ActionIcon,
  Text,
  Divider,
  Box,
} from "@mantine/core";
import { IconAdjustments, IconCircleCheck } from "@tabler/icons";
import { useQuery } from "react-query";
import request from "../utils/request";
import { Amount } from "./Amount";

export const BetList = ({ options, open, onToggle, data, isLoading }) => {
  const account = useAccount();

  const isMe = (item) =>
    item.createdBy === account?.idTokenClaims?.preferred_username;

  const getOptionTitle = (dealOptionID) => {
    return options?.find((option) => option.id === dealOptionID)?.title ?? "-";
  };

  const stabledData = React.useMemo(() => {
    return data
      ?.sort((a, b) => {
        if (isMe(a)) return -1;
        return (b.createdBy ?? "").localeCompare(a.createdBy ?? "");
      })
      .map((item) => ({
        ...item,
        isMe: isMe(item),
        createdBy: isMe(item) ? "Bạn" : item.createdBy,
      }));
  }, [data, account]);

  if (isLoading || data == null)
    return <LoadingOverlay transitionDuration={0} />;
  return (
    <Flex direction="column">
      <Flex direciton="row" justify="space-between" align="center">
        <Title size="large">Bets</Title>
        <ActionIcon
          color="blue.3"
          onClick={onToggle}
          variant={open ? "filled" : "transparent"}
        >
          <IconAdjustments size={18} />
        </ActionIcon>
      </Flex>
      <Space h="md" />
      <Collapse in={open}>
        <Box sx={{ maxHeight: "300px", overflowY: "scroll" }}>
          {data.length == 0 && <p>---</p>}
          <List
            spacing="xs"
            size="sm"
            center
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck size={16} />
              </ThemeIcon>
            }
          >
            {stabledData.map((item, index) => (
              <Box
                sx={{ backgroundColor: item.isMe ? "#343A40" : undefined }}
                p={4}
              >
                <List.Item>
                  <Flex direction="column">
                    <Text size="xs" c="gray.6">
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                    <Text c="gray.6">
                      <Text span c="white">
                        <b>{item.createdBy ? item.createdBy : "-"}</b>
                      </Text>{" "}
                      đặt cược vào {getOptionTitle(item?.dealOptionID)}{" "}
                      <Amount amount={item?.amount} />
                    </Text>
                  </Flex>
                </List.Item>
              </Box>
            ))}
          </List>
        </Box>
      </Collapse>
    </Flex>
  );
};
