import { Group, Stack, Title } from "@mantine/core";
import classes from "./LandingPage.module.css";
import { ControlStack } from "./components/ControlStack/ControlStack";

export const LandingPage = () => {
  return (
    <Stack align="center" h="100%" bg="rgb(32, 32, 32)">
      <Title flex={2} className={classes.title}>
        Factory Planner
      </Title>
      <Group flex={6}>
        <ControlStack label="Items" />
        <ControlStack label="Buildings" />
        <ControlStack label="Recipes" />
      </Group>
    </Stack>
  );
};
