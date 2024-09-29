import { invoke } from '@tauri-apps/api';
import { Button, Text, TextInput, Title } from "@mantine/core";

import classes from "./LandingPage.module.css";
import { useState } from 'react';

export const LandingPage = () => {
  const [filePath, setFilePath] = useState<string>();
  const [output, setOutput] = useState<string>();
  return (
    <>
      <Title className={classes.title} ta="center">Eager Ermine</Title>
      <form className={classes.inputs}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(e); 

          let output: any = invoke(
            'read_file',
            { path: filePath}
            ).then((message) => {setOutput(message as string)});
          console.log(output);
        }}
      >
        <TextInput
          onChange={(e) => {
            setOutput("");
            setFilePath(e.currentTarget.value);
          }}
          id="greet-input"
          placeholder="Enter your name" />
        <Button type="submit" >Get File</Button>
      </form>
      <Text>{output}</Text>
    </>
  )
}
