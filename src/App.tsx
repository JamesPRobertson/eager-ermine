import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { Button, Text, TextInput, Title } from "@mantine/core";

import classes from "./App.module.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return(
    <div className={classes.appMain}>
      <Title className={classes.title} ta="center">Eager Ermine</Title>
      <form className={classes.inputs}
        onSubmit={(e) => {e.preventDefault(); greet(); }}
      >
        <TextInput onChange={(e) => setName(e.currentTarget.value)} id="greet-input" placeholder="Enter your name"/>
        <Button type="submit" >Say hi!</Button>
      </form>
      <Text ta='center'>{greetMsg}</Text>
    </div>
  )
}

export default App;
