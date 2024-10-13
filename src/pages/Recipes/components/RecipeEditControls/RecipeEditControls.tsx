import { useEffect, useMemo } from "react";
import { Button, Divider, Flex, Grid, Group, NumberInput, Select, Text, TextInput } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";

type ValueLabelPair = {
  value: string | undefined,
  label: string | undefined,
}

const emptyValueLabelPair: ValueLabelPair = {
  value: undefined,
  label: undefined
}


interface RecipeFormValues {
  name: string
  input0Name: ValueLabelPair | undefined
  input0Quantity: number | undefined,
  input1Name: ValueLabelPair | undefined,
  input1Quantity: number | undefined,
  input2Name: ValueLabelPair | undefined,
  input2Quantity: number | undefined,
  input3Name: ValueLabelPair | undefined,
  input3Quantity: number | undefined,
  output0Name: ValueLabelPair | undefined,
  output0Quantity: number | undefined,
  output1Name: ValueLabelPair | undefined,
  output1Quantity: number | undefined,
  output2Name: ValueLabelPair | undefined,
  output2Quantity: number | undefined,
  output3Name: ValueLabelPair | undefined,
  output3Quantity: number | undefined,
  building: ValueLabelPair,
  rate: number | undefined
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

const initalFormValues: RecipeFormValues = {
  name: '',
  input0Name: emptyValueLabelPair,
  input0Quantity: undefined,

  input1Name: emptyValueLabelPair,
  input1Quantity: undefined,

  input2Name: emptyValueLabelPair,
  input2Quantity: undefined,

  input3Name: emptyValueLabelPair,
  input3Quantity: undefined,

  output0Name: emptyValueLabelPair,
  output0Quantity: undefined,

  output1Name: emptyValueLabelPair,
  output1Quantity: undefined,

  output2Name: emptyValueLabelPair,
  output2Quantity: undefined,

  output3Name: emptyValueLabelPair,
  output3Quantity: undefined,

  building: emptyValueLabelPair,
  rate: undefined
}

function mapRecipeToFormValue(recipe: Recipe): RecipeFormValues {
  let inputs: [ValueLabelPair | undefined, number | undefined][] = [];
  let outputs: [ValueLabelPair | undefined, number | undefined][] = [];

  for (let i = 0; i < 4; i++) {
    try {
      inputs.push([{
          value: `${recipe.inputs[i].id}`,
          label: database.items[recipe.inputs[i].id].name,
        }, 
        recipe.inputs[i].quantity
      ]);
    }
    catch {
      inputs.push([undefined, undefined])
    }
  }

  for (let i = 0; i < 4; i++) {
    try {
      outputs.push([{
        value: `${recipe.outputs[i].id}`,
        label: database.items[recipe.outputs[i].id].name,
      }, 
      recipe.outputs[i].quantity
    ]);
    }
    catch {
      outputs.push([undefined, undefined])
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

    building: {
      value: `${recipe.building}` ?? "",
      label: recipe.building ? database.buildings[recipe.building].name : "",
    },
    rate: recipe.baseSpeed ?? undefined
  } 
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
    initialValues: initalFormValues
  });

  const handleSubmit = (values: RecipeFormValues) => {
    console.log(values);
  }

  useEffect(() => {
    if (selectedRecipe && selectedRecipe.name != undefined) {
      form.setValues(mapRecipeToFormValue(selectedRecipe));
    }
    else {
      form.setValues(initalFormValues);
    }
  }, [selectedRecipe])

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
        variant="unstyled"
        placeholder="Recipe Name"
        size="xl"
        fw={700}
        ta="center"
        bg="rgba(255, 255, 255, 0.075)"
        p={8}
        style={{borderRadius: 4}}
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
              data={availableBuildings}
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
