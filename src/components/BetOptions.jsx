import {
  Box,
  Card,
  Center,
  Flex,
  Loader,
  Space,
  Title,
  Grid,
  Button,
  Text,
  Modal,
} from "@mantine/core";

import React from "react";
import { Amount } from "./Amount";
import styles from "./BetOptions.module.scss";
import { groupBet } from "./BetRate";

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

function BetOption({ option, index, amount, onTap, highlight, rate }) {
  const isActive = amount != null;

  return (
    <Flex direction="column" onClick={onTap}>
      <Title
        onClick={onTap}
        align="center"
        variant="gradient"
        gradient={gradientMaps[index]}
        order={3}
      >
        {option?.title}
      </Title>
      <Text align="center">{rate ? `1 : ${rate}` : "-"}</Text>
      <Space h="sm" />

      <Box radius="md">
        <Box
          className={isActive ? styles.glow : undefined}
          sx={{
            position: "relative",
            height: "100px",
            boxShadow: isActive
              ? `0 0 6px 3px #fff, 0 0 6px 3px ${gradientMaps[index].from}, 0 0 10px 5px ${gradientMaps[index].to};`
              : undefined,
          }}
        >
          {highlight && (
            <>
              <Box
                className={styles.rainbow}
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  bottom: 0,
                  left: 0,
                }}
              ></Box>
              <Box
                sx={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  bottom: 2,
                  left: 2,
                  backgroundColor: "black",
                }}
              ></Box>
            </>
          )}

          <Box
            radius="md"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              overflow: "hidden",
            }}
          >
            <img
              onClick={onTap}
              frameBorder="0"
              style={{
                objectFit: "cover",
                opacity: isActive ? 0.5 : 0.25,
                borderRadius: "12px",
                overflow: "hidden",
              }}
              src={option.infoSource}
              width="100%"
              height="100%"
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "transparent",
            }}
          ></Box>
          {isActive && (
            <Box sx={{ position: "absolute", top: 1, right: 3 }}>
              <Text
                size="h6"
                variant="gradient"
                gradient={gradientMaps[index]}
                order={3}
              >
                {amount ?? 0}
                <span>🍺</span>
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  );
}

function ContenBuilder({ options = [], onPlaceBet, isUpdating, bets }) {
  const [currentBet, setCurrentBet] = React.useState({
    amount: 0,
    optionId: undefined,
  });
  const [confirmedOpen, setConfirmedOpen] = React.useState(false);

  const highlight = currentBet?.optionId == null;

  const selectedOption = options.find(
    (option) => option.id == currentBet?.optionId
  );
  const selectedOptionIndex = options.findIndex(
    (option) => option.id == currentBet?.optionId
  );

  const placeBet = () => {
    setConfirmedOpen(false);
    if (currentBet?.amount) {
      onPlaceBet(currentBet, {
        onSuccess: () => {
          setCurrentBet({ amount: 0, optionId: undefined });
        },
      });
    }
  };

  const groups = groupBet(bets);
  const getRate = (id) => {
    const value = groups?.find((item) => item.id === id)?.value;
    if (!value) return null;
    const sum = groups?.reduce((s, r) => (s += r.value), 0);
    if (!sum) return null;
    console.log(sum, value);
    return (1 + (sum - value) / value).toFixed(2);
  };

  if (options?.length === 0) return <Title order={3}>Quay lại sau nhé!</Title>;
  return (
    <Flex direction="column">
      <Grid>
        {options.map((option, index) => (
          <Grid.Col span={6}>
            <BetOption
              highlight={highlight}
              key={`${option.id}${index}`}
              rate={getRate(option.id)}
              amount={
                option.id === currentBet.optionId
                  ? currentBet.amount
                  : undefined
              }
              onTap={() => {
                if (currentBet.optionId != option.id) {
                  setCurrentBet({
                    optionId: option.id,
                    amount: 1,
                  });
                  return;
                }
                const currentAmount = currentBet?.amount ?? 0;
                if (currentAmount >= 10) return;
                setCurrentBet({
                  optionId: option.id,
                  amount: currentAmount + 1,
                });
              }}
              index={index}
              option={option}
            />
          </Grid.Col>
        ))}
      </Grid>
      <Space h="lg" />
      <Space h="lg" />
      {!!currentBet?.amount && (
        <Text variant="gradient" gradient={gradientMaps[selectedOptionIndex]}>
          Bạn đặt cược vào <b>{selectedOption.title}</b>{" "}
          <Amount amount={currentBet?.amount} />
        </Text>
      )}
      <Button
        loading={isUpdating}
        variant="gradient"
        size="xl"
        gradient={gradientMaps[selectedOptionIndex]}
        disabled={!currentBet?.amount}
        onClick={() => setConfirmedOpen(true)}
      >
        Chốt kèo liền
      </Button>
      <Space h="lg" />
      <Space h="lg" />
      <Space h="lg" />
      <Modal opened={confirmedOpen} withCloseButton={false}>
        <Text
          variant="gradient"
          gradient={gradientMaps[selectedOptionIndex ?? 0]}
        >
          Bạn đặt cược vào <b>{selectedOption?.title ?? "-"}</b>{" "}
          <Amount amount={currentBet?.amount} />
        </Text>
        <Text>Ok hông?</Text>
        <Space h="lg" />
        <Space h="lg" />
        <Flex align="center">
          <Button onClick={() => placeBet()}>Ok</Button>
          <Space w="lg" />
          <Button onClick={() => setConfirmedOpen(false)}>Hông</Button>
        </Flex>
      </Modal>
    </Flex>
  );
}

function BetOptions({ isLoading, data, onPlaceBet, isUpdating, bets }) {
  return (
    <Box>
      {/* <Notification title="Default notification">
        Đặt lệnh thành công
      </Notification> */}
      <Box>
        {isLoading && (
          <Center h={300}>
            <Loader size="md" />
          </Center>
        )}
        {!isLoading && (
          <ContenBuilder
            bets={bets}
            options={data}
            onPlaceBet={onPlaceBet}
            isUpdating={isUpdating}
          />
        )}
      </Box>
    </Box>
  );
}

export default BetOptions;
