import { Badge, Group, NumberInput, Select, Stack } from "@mantine/core";
import { useMemo, useState } from "react";
import { useDebouncedState } from "@mantine/hooks";
import { ItemTable } from "./ItemTable/ItemTable";
import { RecipeAttributeDisplay } from "./RecipeAttributeDisplay/RecipeAttributeDisplay";

import { database } from "lib/database";

type ValueLabelPair = {
  label: string;
  value: string;
};

type RecipePlan = {
  inputs: { name: string; quantity: number }[];
  outputs: { name: string; quantity: number }[];
  rate?: number;
};

function createRecipePlan(selectedRecipe?: Recipe, quantity?: number | string): RecipePlan {
  if (!selectedRecipe || quantity === undefined) {
    return {} as RecipePlan;
  }

  let newRecipePlan: RecipePlan = { inputs: [], outputs: [] };

  selectedRecipe.inputs.map((value: Input) => {
    newRecipePlan.inputs.push({
      name: database.items[value.id].name,
      quantity: value.quantity * (quantity as number)
    });
  });

  selectedRecipe.outputs.map((value: Output) => {
    newRecipePlan.outputs.push({
      name: database.items[value.id].name,
      quantity: value.quantity * (quantity as number)
    });
  });

  newRecipePlan.rate = selectedRecipe.baseRate;

  return newRecipePlan;
}

export const LineControls = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe>();
  const [recipeQuantity, setRecipeQuantity] = useDebouncedState<number | string | undefined>(undefined, 200);

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
      <Group>
        <Select
          label="Target Recipe"
          placeholder="None"
          clearable
          searchable
          data={availableRecipes}
          onChange={(value: string | null) => {
            if (value !== null) {
              setSelectedRecipe(database.recipes[value as any]);
            } else {
              setSelectedRecipe(undefined);
            }
          }}
        />
        <NumberInput
          label="Quantity"
          allowNegative={false}
          w="6em"
          onChange={(value: number | string | undefined) => {
            setRecipeQuantity((prevState) => (value === "" ? prevState : value));
          }}
        />
        {selectedRecipe && recipeQuantity && currentPlan.rate && (
          <RecipeAttributeDisplay
            rate={currentPlan.rate}
            buildingName={database.buildings[selectedRecipe.building].name}
          />
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
