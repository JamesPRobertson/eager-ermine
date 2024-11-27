import { Badge, Group } from "@mantine/core";
import { useState } from "react";

type RecipeAttributeDisplayProps = {
  rate: number;
  buildingName: string;
};

export const RecipeAttributeDisplay = ({ rate, buildingName }: RecipeAttributeDisplayProps) => {
  const [unit, setUnit] = useState<"minute" | "second">("minute");

  return (
    <Group mt="lg" style={{ cursor: "default" }}>
      <Badge style={{ cursor: "pointer"}}variant="light" color="green" radius="sm" component="button" onClick={() => {
        setUnit((prev) => (prev === "minute" ? "second" : 'minute'))
      }}>
        {unit === "minute" ? rate : rate / 60} / {unit} 
      </Badge>
      <Badge variant="light" color="blue" radius="sm">
        {buildingName}
      </Badge>
    </Group>
  );
};
