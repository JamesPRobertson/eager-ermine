import { Button, Flex, Group, TextInput, Title } from "@mantine/core"

import { database } from "lib/database"
import { useForm } from "@mantine/form"

export const EditControls = ({selected}: {selected?: Item}) => {
  const form = useForm({
    mode:"uncontrolled",
    initialValues: {
      name: ""
    },
    validate: {
      name: (value) => (value === "" ? "Name cannot be empty" : null)
    }
  })

  return (
    <Flex
      p="lg"
      direction="column"
      gap="lg"
      align="center"
      flex={1}
    >
      <Title>
        {selected ? selected.name : "Select an item on the left"}
      </Title>
      {
        selected && 
        <Flex
          component="form"
          onSubmit={() => {
            form.onSubmit((values) => {
              database.updateItem({id: selected.id, name: values.name, tags: selected.tags});
              database.commitItems();
            })
          }}
          direction="column"
          gap="md"
          h="100%"
        >
          <TextInput
            label="Name"
            placeholder={selected.name}
            key={form.key("name")}
            {...form.getInputProps('name')}
          />
          <Group
            justify="space-between"
          >
            <Button
              variant="outline"
              color="rgba(255, 0, 0, 1)"
            >
              Delete
            </Button>
            <Button
              color="gray"
            >
              Discard
            </Button>
            <Button
              type="submit"
            >
              Save
            </Button>
          </Group>
        </Flex>
      }
    </Flex>
  )
}
