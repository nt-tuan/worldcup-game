import { NumberInput } from "@mantine/core";

function CurrencyInput() {
  return (
    <NumberInput
      label="Bạn muốn chơi bao nhiêu?"
      defaultValue={1000}
      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
      formatter={(value) =>
        !Number.isNaN(parseFloat(value))
          ? `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          : "VND "
      }
    />
  );
}

export default CurrencyInput;
