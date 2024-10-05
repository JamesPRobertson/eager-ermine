import { useEffect, useMemo, useState } from "react";
import { Button, Divider, Flex, Grid, Group, NumberInput, Select, Text, TextInput } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";

interface RecipeFormValues {
  name: string
  input0Name: string | undefined
  input0Quantity: number | undefined,
  input1Name: string | undefined,
  input1Quantity: number | undefined,
  input2Name: string | undefined,
  input2Quantity: number | undefined,
  input3Name: string | undefined,
  input3Quantity: number | undefined,
  output0Name: string | undefined,
  output0Quantity: number | undefined,
  output1Name: string | undefined,
  output1Quantity: number | undefined,
  output2Name: string | undefined,
  output2Quantity: number | undefined,
  output3Name: string | undefined,
  output3Quantity: number | undefined,
  building: string,
  rate: number | undefined
}

type SelectDataDisplay = {
  value: string,
  label: string,
  disabled: false
}

const ItemSelectRow = ({data, form, rowNumber}: {data?: string[], form: any, rowNumber: number}) => {
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
  input0Name: '',
  input0Quantity: undefined,

  input1Name: '',
  input1Quantity: undefined,

  input2Name: '',
  input2Quantity: undefined,

  input3Name: '',
  input3Quantity: undefined,

  output0Name: '',
  output0Quantity: undefined,

  output1Name: '',
  output1Quantity: undefined,

  output2Name: '',
  output2Quantity: undefined,

  output3Name: '',
  output3Quantity: undefined,

  building: '',
  rate: undefined
}

function mapRecipeToFormValue(recipe: Recipe): RecipeFormValues {
  return {
    name: recipe.name,
    input0Name: `${recipe.inputs[0].id ?? ""}`,
    input0Quantity: recipe.inputs[0].quantity,

    input1Name: `${recipe.inputs[1].id ?? ""}`,
    input1Quantity: recipe.inputs[1].quantity,

    input2Name: `${recipe.inputs[2].id ?? ""}`,
    input2Quantity: recipe.inputs[2].quantity,

    input3Name: `${recipe.inputs[3].id ?? ""}`,
    input3Quantity: recipe.inputs[3].quantity,

    output0Name: `${recipe.outputs[0].id ?? ""}`,
    output0Quantity: recipe.outputs[0].quantity,

    output1Name: `${recipe.outputs[1].id ?? ""}`,
    output1Quantity: recipe.outputs[1].quantity,

    output2Name: `${recipe.outputs[2].id ?? ""}`,
    output2Quantity: recipe.outputs[2].quantity,

    output3Name: `${recipe.outputs[3].id ?? ""}`,
    output3Quantity: recipe.outputs[3].quantity,

    building: `${recipe.building}`,
    rate: recipe.baseSpeed
  } 
}

export const RecipeEditControls = ({selectedRecipe, height}: {selectedRecipe?: Recipe, height: number}) => {
  // const [ availableItems, setAvailableItems ] = useState<string[]>();
  // const [ availableBuildings, setAvailableBuildings ] = useState<string[]>();

  const availableItems: SelectDataDisplay[] = useMemo<SelectDataDisplay[]>(() => Object.entries(database.items).map(
    (entry: any, index: any) => ({
      value: `${index}`,
      label: `${entry[1].name}`,
      disabled: false
    })
  ), [database.items]);

  const availableBuildings: SelectDataDisplay[] = useMemo<SelectDataDisplay[]>(() => Object.entries(database.buildings).map(
    (entry: any, index: any) => ({
      value: `${index}`,
      label: `${entry[1].name}`,
      disabled: false
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
