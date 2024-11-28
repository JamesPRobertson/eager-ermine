import { Button, Group } from "@mantine/core";

export const FormControlButtons = () => {
  return (
    <Group style={{ flex: 1, width: "100%", alignItems: "end" }}>
      <Button variant="outline" color="rgb(225, 16, 16">
        Delete
      </Button>
      <Group style={{ flex: 1, justifyContent: "end" }}>
        <Button color="gray" disabled>
          Discard
        </Button>
        <Button color="rgb(0, 128, 0)" type="submit">
          Save
        </Button>
      </Group>
    </Group>
  );
};
