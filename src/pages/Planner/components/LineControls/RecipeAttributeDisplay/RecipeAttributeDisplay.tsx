import { Badge, Group } from "@mantine/core";
import { useState } from "react";

type RecipeAttributeDisplayProps = {
  rate: number;
  buildingName: string;
};

export const RecipeAttributeDisplay = ({ rate, buildingName }: RecipeAttributeDisplayProps) => {
  const [unit, setUnit] = useState<"minute" | "second">("minute");
  const calculatedRate = unit === "minute" ? rate : rate / 60;

  return (
    <Group gap="sm" mt="lg" style={{ cursor: "default" }}>
      <Badge variant="light" color="blue" radius="sm">
        {buildingName}
      </Badge>
      <Badge
        style={{ cursor: "pointer" }}
        variant="light"
        color="green"
        radius="sm"
        component="button"
        onClick={() => {
          setUnit((prev) => (prev === "minute" ? "second" : "minute"));
        }}
      >
        {calculatedRate} / {unit}
      </Badge>
    </Group>
  );
};
