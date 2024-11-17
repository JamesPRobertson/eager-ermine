import { Divider, Flex, Group, NumberInput, Select, Stack, Text } from "@mantine/core";

import classes from "./LineControls.module.css";
import { useMemo, useState } from "react";

import { database } from "lib/database";

type ValueLabelPair = {
  label?: string;
  value?: string;
};

const ListEntry = ({ name, quantity }: any) => {
  console.log(`Got ${name} `);
  return (
    <Group className={classes.listEntry}>
      <Text className={classes.listEntryText}>{name}</Text>
      <Divider style={{ marginLeft: "auto" }} orientation="vertical" />
      <Text w={32} ta="end">
        {quantity}
      </Text>
    </Group>
  );
};

type RecipePlan = {
  inputs: { name: string; quantity: number }[];
  outputs: { name: string; quantity: number }[];
};

function createRecipePlan(selectedRecipe?: Recipe, quantity?: number): RecipePlan {
  if (!selectedRecipe || quantity === undefined) {
    return {} as RecipePlan;
  }

  let newRecipePlan: RecipePlan = { inputs: [], outputs: [] };

  selectedRecipe.inputs.map((value: Input) => {
    console.log("This below");
    console.log(value);
    console.log(database.items[value.id].name);
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

  console.log(newRecipePlan);

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

  console.log(currentPlan);

  return (
    <Flex w="100%" h="100%" gap="lg">
      <Stack flex={3}>
        <Group>
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
        </Group>
      </Stack>
      <Stack className={classes.aside}>
        <Stack flex={2}>
          <Text ta="center">Inputs</Text>
          <Divider mt="-0.25em" />
          {currentPlan.inputs &&
            currentPlan.inputs.map((value: any) => (
              <ListEntry {...value} key={value.id} />
            ))}
        </Stack>
        <Stack flex={1}>
          <Text ta="center">Outputs</Text>
          <Divider mt="-0.25em" />
          {currentPlan.outputs &&
            currentPlan.outputs.map((value: any) => (
              <ListEntry {...value} key={value.id} />
            ))}
        </Stack>
      </Stack>
    </Flex>
  );
};
