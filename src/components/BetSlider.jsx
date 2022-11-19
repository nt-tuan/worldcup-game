import { Center, Slider, Stack, Text } from "@mantine/core";

import { useState } from "react";

const MARKS = [
  { value: 0, label: "0" },
  { value: 10, label: "1" },
  { value: 20, label: "2" },
  { value: 30, label: "3" },
  { value: 40, label: "4" },
  { value: 50, label: "5" },
  { value: 60, label: "6" },
  { value: 70, label: "7" },
  { value: 80, label: "8" },
  { value: 90, label: "9" },
  { value: 100, label: "10" },
];

function BetSlider({ onChangeEnd }) {
  const [value, setValue] = useState(50);
  return (
    <Stack>
      <Center>
        <Text fz="32px" fw={500}>
          {value > 0 ? value / 10 : 0}
        </Text>
      </Center>
      <Slider
        onChange={setValue}
        onChangeEnd={() => {}}
        label={(val) => MARKS.find((mark) => mark.value === val).label}
        defaultValue={50}
        step={10}
        styles={{ markLabel: { display: "none" } }}
        thumbSize={24}
        showLabelOnHover={false}
      />
    </Stack>
  );
}

export default BetSlider;
