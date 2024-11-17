import { Flex, Stack, Text } from "@mantine/core"

import classes from "./LineControls.module.css";

export const LineControls = () => {
  return (
    <Flex w="100%" h="100%" gap="lg">
      <Text ta="center" flex={3}>Line Controls</Text>
      <Stack className={classes.aside}>
        <Stack flex={1}>
          <Text ta="center">Inputs</Text>
        </Stack>
        <Stack flex={1}>
          <Text ta="center">Outputs</Text>
        </Stack>
      </Stack>
    </Flex>
  )
}
