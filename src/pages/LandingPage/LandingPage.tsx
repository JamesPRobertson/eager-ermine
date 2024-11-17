import { Group, Space, Stack, Title } from "@mantine/core";
import classes from "./LandingPage.module.css";
import { ControlStack } from "./components/ControlStack/ControlStack";

export const LandingPage = () => {
  return (
    <Stack align="center" pt="xl" h="100%" bg="rgb(32, 32, 32)">
      <Title className={classes.title} ta="center">
        Factory Planner
      </Title>
      <Space h="xl" />
      <Group>
        <ControlStack label="Items" />
        <ControlStack label="Buildings" />
        <ControlStack label="Recipes" />
      </Group>
    </Stack>
  );
};
