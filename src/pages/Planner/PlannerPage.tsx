import { Stack, Tabs } from "@mantine/core";
import { LineControls } from "./components/LineControls/LineControls";

import classes from "./PlannerPage.module.css";

export const PlannerPage = () => {
  return (
    <Stack bg="rgb(30, 30, 30)" w="100%" h="100%" pt="sm">
      <Tabs defaultValue="first" classNames={classes}>
        <Tabs.List>
          <Tabs.Tab value="first">First</Tabs.Tab>
          <Tabs.Tab value="second">Second</Tabs.Tab>
          <Tabs.Tab value="third">Third</Tabs.Tab>
          <Tabs.Tab value="fourth">Fourth</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">
          <LineControls />
        </Tabs.Panel>
        <Tabs.Panel value="second">
          <LineControls />
        </Tabs.Panel>
        <Tabs.Panel value="third">
          <LineControls />
        </Tabs.Panel>
        <Tabs.Panel value="fourth">
          <LineControls />
        </Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
