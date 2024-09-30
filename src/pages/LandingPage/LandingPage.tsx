import { Flex, Group, Title } from "@mantine/core";
import classes from "./LandingPage.module.css";

export const LandingPage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h={400}
    >
      <Title className={classes.title} ta="center">Eager Ermine Factory Planner</Title>
    </Flex>
  )
}
