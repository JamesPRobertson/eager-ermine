import { useEffect, useState } from "react";
import { Button, Divider, Flex, Grid, Group, NumberInput, Select, Text, Title } from "@mantine/core";

import { database } from "lib/database";

const ItemSelectPair = ({data}: {data?: string[]}) => {
  return (
    <>
      <Grid.Col span={4}>
        <Select 
          placeholder="None"
          clearable
          searchable
          data={data}
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <NumberInput
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          max={999}
          hideControls
        />           
      </Grid.Col>
    </>
  )
}


export const RecipeEditControls = ({selectedRecipe}: {selectedRecipe?: Recipe}) => {
  const [ availableItems, setAvailableItems ] = useState<string[]>();
  const [ availableBuildings, setAvailableBuildings ] = useState<string[]>();

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
    >
      <Title>
        { selectedRecipe ? database.items[selectedRecipe.outputs[0].id].name : "Select a recipe from the left"}
      </Title>
      {
        selectedRecipe && 
        <Grid
          grow
        >
          <Grid.Col span={5} >
            <Text ta="center" fw={650} size="xl">Input</Text>
          </Grid.Col>
          <Grid.Col span={2} />
          <Grid.Col span={5} >
            <Text ta="center" fw={650} size="xl">Output</Text>
          </Grid.Col>

          <ItemSelectPair data={availableItems} />
          <Grid.Col span={2} />
          <ItemSelectPair data={availableItems} />

          <ItemSelectPair data={availableItems} />
          <Grid.Col span={2} />
          <ItemSelectPair data={availableItems} />

          <ItemSelectPair data={availableItems} />
          <Grid.Col span={2} />
          <ItemSelectPair data={availableItems} />

          <ItemSelectPair data={availableItems} />
          <Grid.Col span={2} />
          <ItemSelectPair data={availableItems} />

          <Grid.Col span={12}>
            <Divider orientation="horizontal" mx="lg" />
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
