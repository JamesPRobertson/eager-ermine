import { useEffect, useState } from "react";
import { Button, Divider, Flex, Grid, Group, NumberInput, Select, Text, Title } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";

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


export const RecipeEditControls = ({selectedRecipe, height}: {selectedRecipe?: Recipe, height: number}) => {
  const [ availableItems, setAvailableItems ] = useState<string[]>();
  const [ availableBuildings, setAvailableBuildings ] = useState<string[]>();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
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
  });

  useEffect(() => {
    setAvailableItems(Object.entries(database.items).map(
      (entry: any, index: any) => ( `${entry[1].name}`)
    ));

    setAvailableBuildings(Object.entries(database.buildings).map(
      (entry: any, index: any) => ( `${entry[1].name}`)
    ));
  }, []);

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
      <Title>
        { selectedRecipe ?
          database.items[selectedRecipe.outputs[0].id].name :
          "Select a recipe from the left" }
      </Title>
      {
        selectedRecipe && 
        <Grid
          grow
          component="form"
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
