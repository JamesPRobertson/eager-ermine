import { useMemo } from "react";
import { Button, Divider, Flex, Grid, Group, NumberInput, Select, Text, TextInput } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";

import classes from "./RecipeEditControls.module.css";


type ValueLabelPair = {
  value?: string,
  label?: string,
}

export interface RecipeFormValues {
  [index: string]: string | number | undefined;
  name: string
  input0Name?: number;
  input0Quantity?: number;
  input1Name?: number;
  input1Quantity?: number;
  input2Name?: number;
  input2Quantity?: number;
  input3Name?: number;
  input3Quantity?: number;
  output0Name?: number;
  output0Quantity?: number;
  output1Name?: number;
  output1Quantity?: number;
  output2Name?: number;
  output2Quantity?: number;
  output3Name?: number;
  output3Quantity?: number;
  building?: number;
  rate?: number;
}

const ItemSelectRow = ({data, form, rowNumber}: {data?: ValueLabelPair[], form: any, rowNumber: number}) => {
  return (
    <>
      <Grid.Col span={4}>
        <Select 
          placeholder="None"
          clearable
          searchable
          data={data}
          key={form.key(`input${rowNumber}Name`)}
          {...form.getInputProps(`input${rowNumber}Name`)}
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <NumberInput
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          max={999}
          hideControls
          placeholder="-"
          key={form.key(`input${rowNumber}Quantity`)}
          {...form.getInputProps(`input${rowNumber}Quantity`)}
        />           
      </Grid.Col>
      <Grid.Col span={2} />
      <Grid.Col span={4}>
        <Select 
          placeholder="None"
          clearable
          searchable
          data={data}
          key={form.key(`output${rowNumber}Name`)}
          {...form.getInputProps(`output${rowNumber}Name`)}
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <NumberInput
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          max={999}
          hideControls
          placeholder="-"
          key={form.key(`output${rowNumber}Quantity`)}
          {...form.getInputProps(`output${rowNumber}Quantity`)}
        />           
      </Grid.Col>
    </>
  )
}

const initialFormValues: RecipeFormValues = {
  name: '',
  input0Name: undefined,
  input0Quantity: undefined,

  input1Name: undefined,
  input1Quantity: undefined,

  input2Name: undefined,
  input2Quantity: undefined,

  input3Name: undefined,
  input3Quantity: undefined,

  output0Name: undefined,
  output0Quantity: undefined,

  output1Name: undefined,
  output1Quantity: undefined,

  output2Name: undefined,
  output2Quantity: undefined,

  output3Name: undefined,
  output3Quantity: undefined,

  building: undefined,
  rate: undefined
}

function mapRecipeToFormValue(recipe: Recipe): any {
  let inputs: [string?, number?][] = [];
  let outputs: [string?, number?][] = [];

  for (let i = 0; i < 4; i++) {
    try {
      inputs.push([`${recipe.inputs[i].id}`, recipe.inputs[i].quantity]);
    }
    catch {
      inputs.push([undefined, undefined]);
    }
  }

  for (let i = 0; i < 4; i++) {
    try {
      outputs.push([`${recipe.outputs[i].id}`, recipe.outputs[i].quantity]);
    }
    catch {
      outputs.push([undefined, undefined]);
    }
  }

  return {
    name: recipe.name,
    input0Name: inputs[0][0],
    input0Quantity: inputs[0][1],

    input1Name: inputs[1][0],
    input1Quantity: inputs[1][1],

    input2Name: inputs[2][0],
    input2Quantity: inputs[2][1],

    input3Name: inputs[3][0],
    input3Quantity: inputs[3][1],

    output0Name: outputs[0][0],
    output0Quantity: outputs[0][1],

    output1Name: outputs[1][0],
    output1Quantity: outputs[1][1],

    output2Name: outputs[2][0],
    output2Quantity: outputs[2][1],

    output3Name: outputs[3][0],
    output3Quantity: outputs[3][1],

    building: `${recipe.building}` ?? "",
    rate: recipe.baseRate ?? undefined
  } 
}

function convertFormValuesToRecipe(value: RecipeFormValues): Recipe {
  let newRecipe: Recipe = {
    id: -1,
    name: value.name,
    inputs: [],
    outputs: [],
    building: value.building as number,
    baseRate: value.rate
  };

  for (let i = 0; i <= 3; i++) {
    if (value[`input${i}Name`] !== undefined && value[`input${i}Name`] !== null) {
      newRecipe.inputs.push({
        id: value[`input${i}Name`] as number,
        quantity: value[`input${i}Quantity`] as number
      });
    }

    if (value[`output${i}Name`] !== undefined && value[`input${i}Name`] !== null) {
      newRecipe.outputs.push({
        id: value[`output${i}Name`] as number,
        quantity: value[`output${i}Quantity`] as number
      });
    }
  }

  return newRecipe;
}

function validateQuantity(quantityField: number | undefined, nameField: number | undefined): string | null {
  return (!quantityField && nameField) || (quantityField && !nameField) ? "Invalid" : null
}

export const RecipeEditControls = ({selectedRecipe, height}: {selectedRecipe?: Recipe, height: number}) => {
  const availableItems: ValueLabelPair[] = useMemo<ValueLabelPair[]>(() => Object.entries(database.items).map(
    (entry: any, index: any) => ({
      value: `${index}`,
      label: `${entry[1].name}`,
    })
  ), [database.items]);

  const availableBuildings: ValueLabelPair[] = useMemo<ValueLabelPair[]>(() => Object.entries(database.buildings).map(
    (entry: any, index: any) => ({
      value: `${index}`,
      label: `${entry[1].name}`,
    })
  ), [database.buildings]);

  const form = useForm<RecipeFormValues>({
    mode: 'uncontrolled',
    initialValues: selectedRecipe ? mapRecipeToFormValue(selectedRecipe) : initialFormValues,
    validate: {
      name: (value) => (!value ? "Invalid name" : null),
      input0Quantity: (value, values) => validateQuantity(value, values.input0Name),
      input1Quantity: (value, values) => validateQuantity(value, values.input1Name),
      input2Quantity: (value, values) => validateQuantity(value, values.input2Name),
      input3Quantity: (value, values) => validateQuantity(value, values.input3Name),
      output0Quantity: (value, values) => validateQuantity(value, values.output0Name),
      output1Quantity: (value, values) => validateQuantity(value, values.output1Name),
      output2Quantity: (value, values) => validateQuantity(value, values.output2Name),
      output3Quantity: (value, values) => validateQuantity(value, values.output3Name),
      building: (value) => (!value || value < 0 ? "Invalid" : null),
      rate: (value) => (!value || value <= 0 ? "Invalid" : null)
    }
  });

  function handleSubmit(values: RecipeFormValues) {
    console.log(values);
    let convertedRecipe = convertFormValuesToRecipe(values);
    console.log(convertedRecipe);
    if (selectedRecipe?.id === undefined) {
      convertedRecipe.id = -1;
      database.addRecipe(convertedRecipe);
    }
    else {
      convertedRecipe.id = selectedRecipe.id;
      database.updateRecipe(convertedRecipe);
    }

    console.log(database.recipes);
  }

  return (
    <Flex
      p="lg"
      direction="column"
      gap="lg"
      align="center"
      flex={1}
      h={height - 40}
      style={{backgroundColor: "rgba(16, 16, 16, 0.66)"}}
    >
      <TextInput
        classNames={{
          input: classes.nameInput
        }}
        variant="unstyled"
        placeholder="Recipe Name"
        size="xl"
        miw={500}
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      {
        selectedRecipe && 
        <Grid
          grow
          component="form"
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <Grid.Col span={5} >
            <Text ta="center" fw={650} size="xl">Input</Text>
          </Grid.Col>
          <Grid.Col span={2} />
          <Grid.Col span={5} >
            <Text ta="center" fw={650} size="xl">Output</Text>
          </Grid.Col>

          <ItemSelectRow data={availableItems} form={form} rowNumber={0} />

          <ItemSelectRow data={availableItems} form={form} rowNumber={1} />

          <ItemSelectRow data={availableItems} form={form} rowNumber={2} />

          <ItemSelectRow data={availableItems} form={form} rowNumber={3} />

          <Grid.Col span={12}>
            <Divider orientation="horizontal" mx="lg" my="sm" />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              label="Building"
              placeholder="None"
              searchable
              clearable
              data={availableBuildings}
              key={form.key(`building`)}
              {...form.getInputProps(`building`)}
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <NumberInput
              label="Base rate"
              placeholder="# / minute"
              allowDecimal={false}
              allowLeadingZeros={false}
              allowNegative={false}
              hideControls
              key={form.key(`rate`)}
              {...form.getInputProps(`rate`)}
            />
          </Grid.Col>
          <Grid.Col span={6}></Grid.Col>

          <Grid.Col span={12} />

          <Grid.Col span={9}>
            <Button
              variant="outline"
              color="red"
            >
              Delete
            </Button>
          </Grid.Col>
          <Grid.Col span={3}>
            <Group
              gap="md"
              justify="end"
            >
              <Button
                color="gray"
                disabled
              >
                Discard
              </Button>
              <Button
                color="rgba(0, 128, 0, 1)"
                type="submit"
              >
                Save
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      }
    </Flex>
  )
}
