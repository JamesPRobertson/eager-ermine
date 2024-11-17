import { Stack, Tabs } from "@mantine/core";

export const PlannerPage = () => {
  return (
    <Stack bg="rgb(30, 30, 30)" w="100%" h="100%" pt="sm">
      <Tabs defaultValue="first">
        <Tabs.List>
          <Tabs.Tab value="first">First</Tabs.Tab>
          <Tabs.Tab value="second">Second</Tabs.Tab>
          <Tabs.Tab value="third">Third</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="first">First</Tabs.Panel>
        <Tabs.Panel value="second">Second</Tabs.Panel>
        <Tabs.Panel value="third">Third</Tabs.Panel>
      </Tabs>
    </Stack>
  );
};
