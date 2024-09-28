import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { AppShell, Button, Text, TextInput, Title } from "@mantine/core";

import classes from "./App.module.css";

function App() {
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreeting(await invoke("greet", { name }));
  }

  return(
    <div className={classes.appMain}>
      <AppShell
        header={{height: 50}}
      >
        <AppShell.Header>
          <Text>Appbar!</Text>
        </AppShell.Header>
        <AppShell.Main>
          <Title className={classes.title} ta="center">Eager Ermine</Title>
          <form className={classes.inputs}
            onSubmit={(e) => {e.preventDefault(); greet(); }}
          >
            <TextInput onChange={(e) => setName(e.currentTarget.value)} id="greet-input" placeholder="Enter your name"/>
            <Button type="submit" >Say hi!</Button>
          </form>
          <Text ta='center'>{greeting}</Text>
        </AppShell.Main>
      </AppShell>
    </div>
  )
}

export default App;
