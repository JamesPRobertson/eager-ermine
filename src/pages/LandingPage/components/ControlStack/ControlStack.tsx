import { Button, Stack, Text } from "@mantine/core";
import { FaFileExport, FaFileImport, FaTrash } from "react-icons/fa";
import classes from "./ControlStack.module.css";

type ControlStackProps = {
  label: string;
};

export const ControlStack = ({ label }: ControlStackProps) => {
  return (
    <Stack className={classes.container}>
      <Text className={classes.title}>{label}</Text>
      <Button leftSection={<FaFileImport size={16}/>}>Import</Button>
      <Button leftSection={<FaFileExport size={16}/>}>Export</Button>
      <Button leftSection={<FaTrash size={16} />} variant="outline" color="rgb(255,0,0)">
        Delete
      </Button>
    </Stack>
  );
};
