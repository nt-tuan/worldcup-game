import { Group, Switch, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

export const colorSchemeEnum = {
  DARK: "dark",
  LIGHT: "light",
};

export function SwitchToggle({ colorScheme, toggleColorScheme }) {
  const theme = useMantineTheme();

  return (
    <Switch
      checked={colorScheme === colorSchemeEnum.DARK}
      onChange={() =>
        toggleColorScheme(
          colorScheme === colorSchemeEnum.DARK
            ? colorSchemeEnum.LIGHT
            : colorSchemeEnum.DARK
        )
      }
      size="lg"
      onLabel={<IconSun color={theme.white} size={20} stroke={1.5} />}
      offLabel={<IconMoonStars color={theme.colors.gray[6]} stroke={1.5} />}
    />
  );
}
