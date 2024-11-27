import { Group, NumberInput, Select, Stack, Text } from "@mantine/core";
import { useMemo, useState } from "react";
import { ItemTable } from "./ItemTable/ItemTable";

import { database } from "lib/database";

type ValueLabelPair = {
  label?: string;
  value?: string;
};

type RecipePlan = {
  inputs: { name: string; quantity: number }[];
  outputs: { name: string; quantity: number }[];
  rate?: number;
};

function createRecipePlan(selectedRecipe?: Recipe, quantity?: number): RecipePlan {
  if (!selectedRecipe || quantity === undefined) {
    return {} as RecipePlan;
  }

  let newRecipePlan: RecipePlan = { inputs: [], outputs: [] };

  selectedRecipe.inputs.map((value: Input) => {
    newRecipePlan.inputs.push({
      name: database.items[value.id].name,
      quantity: value.quantity * quantity
    });
  });

  selectedRecipe.outputs.map((value: Output) => {
    newRecipePlan.outputs.push({
      name: database.items[value.id].name,
      quantity: value.quantity * quantity
    });
  });

  newRecipePlan.rate = selectedRecipe.baseRate;

  return newRecipePlan;
}

export const LineControls = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
  const [recipeQuantity, setRecipeQuantity] = useState<number>();

  const availableRecipes: ValueLabelPair[] = useMemo<ValueLabelPair[]>(
    () =>
      Object.entries(database.recipes).map((entry: [string, Recipe], index: number) => ({
        value: `${index}`,
        label: `${entry[1].name}`
      })),
    [database.recipes]
  );

  const currentPlan = createRecipePlan(selectedRecipe, recipeQuantity);

  return (
    <Stack w="100%" h="100%" gap="lg">
      <Group justify="center">
        <Select
          label="Target Recipe"
          placeholder="None"
          clearable
          searchable
          data={availableRecipes}
          onChange={(value) => {
            setSelectedRecipe(database.recipes[value]);
          }}
        />
        <NumberInput
          label="Quantity"
          hideControls
          allowNegative={false}
          w="6em"
          onChange={(value) => {
            setRecipeQuantity(value);
          }}
        />
        {selectedRecipe && recipeQuantity && currentPlan.rate && (
          <Text>Base rate: {currentPlan.rate ?? "unknown"} per minute</Text>
        )}
      </Group>
      {selectedRecipe && recipeQuantity && (
        <>
          <ItemTable flex={1} title="Inputs" data={currentPlan.inputs} rate={currentPlan.rate} />
          <ItemTable flex={1} title="Outputs" data={currentPlan.outputs} rate={currentPlan.rate} />
        </>
      )}
    </Stack>
  );
};
