import { Button, Divider, Flex, Grid, Group, NumberInput, Select, Text, Title } from "@mantine/core"

import { database } from "lib/database"


const ItemSelectPair = () => {
  return (
    <>
      <Grid.Col span={4}>
        <Select 
          placeholder="None"
          searchable
        />
      </Grid.Col>
      <Grid.Col span={1}>
        <NumberInput
          allowDecimal={false}
          allowLeadingZeros={false}
          allowNegative={false}
          hideControls
        />           
      </Grid.Col>
    </>
  )
}


export const RecipeEditControls = ({selectedRecipe}: {selectedRecipe?: Recipe}) => {
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

          <ItemSelectPair />
          <Grid.Col span={2} />
          <ItemSelectPair />

          <ItemSelectPair />
          <Grid.Col span={2} />
          <ItemSelectPair />

          <ItemSelectPair />
          <Grid.Col span={2} />
          <ItemSelectPair />

          <ItemSelectPair />
          <Grid.Col span={2} />
          <ItemSelectPair />

          <Grid.Col span={12}>
            <Divider orientation="horizontal" mx="lg" />
          </Grid.Col>

          <Grid.Col span={4}>
            <Select
              label="Building"
              placeholder="None"
              searchable
            />
          </Grid.Col>
          <Grid.Col span={2}>
            <NumberInput
              label="Base rate"
              placeholder="# / minute"
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
