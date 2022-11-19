import { Group, Switch, useMantineTheme } from "@mantine/core";
import { IconMoonStars, IconSun } from "@tabler/icons";

export const colorSchemeEnum = {
  DARK: "dark",
  LIGHT: "light",
};

export function SwitchToggle({ colorScheme, toggleColorScheme }) {
  const theme = useMantineTheme();

  return (
    <Group position="center" my={30}>
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
        offLabel={
          <IconMoonStars color={theme.colors.gray[6]} size={20} stroke={1.5} />
        }
      />
    </Group>
  );
}
