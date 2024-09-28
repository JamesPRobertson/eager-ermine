import { Anchor, Button, TextInput, Title } from "@mantine/core";

import classes from "./LandingPage.module.css";

import { Link } from "react-router-dom";

export const LandingPage = () => {
  return (
    <>
      <Title className={classes.title} ta="center">Eager Ermine</Title>
      <form className={classes.inputs}
        onSubmit={(e) => {e.preventDefault(); console.log(e); }}
      >
        <TextInput onChange={(e) => console.log("woo")} id="greet-input" placeholder="Enter your name"/>
        <Button type="submit" >Say hi!</Button>
        <Anchor component={Link} variant="link" to="/items" >Clicky</Anchor>
      </form>
    </>
  )
}
