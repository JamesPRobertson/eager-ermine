import { Divider, Flex, Group, Stack, Text } from "@mantine/core";

import classes from "./LineControls.module.css";

const ListEntry = ({ name, quantity }: any) => {
  return (
    <Group className={classes.listEntry} >
      <Text className={classes.listEntryText}>{name}</Text>
      <Divider style={{marginLeft: "auto"}} orientation="vertical" />
      <Text miw={32} ta="end">{quantity}</Text>
    </Group>
  )
}

export const LineControls = () => {
  return (
    <Flex w="100%" h="100%" gap="lg">
      <Text ta="center" flex={3}>
        Line Controls
      </Text>
      <Stack className={classes.aside}>
        <Stack flex={1}>
          <Text ta="center">Inputs</Text>
          <Divider mt="-0.25em" />
          <ListEntry name="Tortilla" quantity={1} />
          <ListEntry name="Tomato" quantity={32} />
          <ListEntry name="Rice" quantity={463} />
          <ListEntry name="Beans" quantity={64} />
        </Stack>
        <Stack flex={1}>
          <Text ta="center">Outputs</Text>
          <Divider mt="-0.25em" />
          <ListEntry name="Burrito" quantity={1} />
        </Stack>
      </Stack>
    </Flex>
  );
};
