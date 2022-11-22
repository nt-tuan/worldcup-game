import { Progress } from "@mantine/core";
import React from "react";
import { Amount } from "./Amount";

const colors = [
  "teal",
  "orange",
  "indigo",
  "teal",
  "#ed6ea0",
  "indigo",
  "teal",
  "teal",
  "orange",
];

export const groupBet = (bets) => {
  if (bets == null) return [];
  const map = new Map();
  for (const bet of bets) {
    const n = map.size;
    if (!map.has(bet.dealOptionID))
      map.set(bet.dealOptionID, {
        id: bet.dealOptionID,
        value: 0,
        color: colors[n % colors.length],
      });
    map.get(bet.dealOptionID).value += bet.amount ?? 0;
  }

  const sum = bets.reduce((s, c) => s + c.amount, 0);

  return Array.from(map.values()).map((item) => ({
    ...item,
    value: sum ? Math.round((item.value * 100) / sum) : 0,
    label: <Amount amount={item.value} />,
  }));
};

export const BetRate = ({ bets }) => {
  const sections = React.useMemo(() => {
    groupBet(bets);
  }, [bets]);

  if (bets == null || bets.length === 0) return null;
  return <Progress radius="xl" size="xl" sections={sections} />;
};
