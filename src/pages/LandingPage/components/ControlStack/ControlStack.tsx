import { Button, FileButton, Paper, Stack, Text } from "@mantine/core";
import { FaFileExport, FaFileImport, FaTrash } from "react-icons/fa";
import classes from "./ControlStack.module.css";
import { useRef } from "react";

type ControlStackProps = {
  label: string;
};

export const ControlStack = ({ label }: ControlStackProps) => {
  const importFile = useRef<File | null>();
  const exportFile = useRef<File | null>();

  return (
    <Paper className={classes.container} shadow="md">
      <Stack>
        <Text className={classes.title}>{label}</Text>
        <FileButton onChange={(payload: File | null) => (importFile.current = payload)}>
          {(props) => (
            <Button {...props} leftSection={<FaFileImport size={16} />}>
              Import
            </Button>
          )}
        </FileButton>
        <FileButton onChange={(payload: File | null) => (exportFile.current = payload)}>
          {(props) => (
            <Button {...props} leftSection={<FaFileExport size={16} />}>
              Export
            </Button>
          )}
        </FileButton>
        <Button leftSection={<FaTrash size={16} />} variant="outline" color="rgb(255,0,0)">
          Delete
        </Button>
      </Stack>
    </Paper>
  );
};
