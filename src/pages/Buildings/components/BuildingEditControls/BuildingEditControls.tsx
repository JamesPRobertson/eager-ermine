import { Button, Flex, Group, NumberInput, Space } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";
import { ObjectNameEntry } from "components/ObjectNameEntry/ObjectNameEntry";

type FormValues = {
  name?: string;
  craftingSpeedFactor?: number;
  powerConsumption?: number;
};

const initialFormValues: FormValues = {
  name: undefined,
  craftingSpeedFactor: undefined,
  powerConsumption: undefined
};

function mapBuildingToFormValues(building: Building): FormValues {
  return {
    name: building.name,
    craftingSpeedFactor: building.craftingSpeedFactor,
    powerConsumption: building.powerConsumption
  };
}

export const BuildingEditControls = ({ selected }: { selected?: Building }) => {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: selected ?? initialFormValues,
    validate: {
      name: (value) => (value === "" ? "Name cannot be empty" : null)
    }
  });

  return (
    <Flex
      p="xl"
      direction="column"
      align="center"
      flex={1}
      style={{ backgroundColor: "rgba(16, 16, 16, 0.66)" }}
      h="100%"
    >
      <Flex
        component="form"
        onSubmit={() => {
          form.onSubmit((values) => {
            /* TODO: write for buildings
              database.updateItem({id: selected.id, name: values.name});
              database.commitItems();
              */
          });
        }}
        direction="column"
        gap="lg"
        h="100%"
      >
        <ObjectNameEntry form={form} formKey="name" placeholder="Building Name" />
        <Group gap="4em">
          <NumberInput
            flex={1}
            label="Power Consumption"
            hideControls
            allowNegative={false}
            placeholder="-"
            key={form.key("powerConsumption")}
            {...form.getInputProps("powerConsumption")}
          />
          <NumberInput
            flex={1}
            label="Crafting Speed"
            hideControls
            allowNegative={false}
            allowDecimal
            placeholder="-"
            key={form.key("craftingSpeedFactor")}
            {...form.getInputProps("craftingSpeedFactor")}
          />
        </Group>
        <Space />
        <Group>
          <Group flex={1}>
            <Button variant="outline" color="rgba(255, 0, 0, 1)">
              Delete
            </Button>
          </Group>
          <Group flex={1} justify="end">
            <Button color="gray" disabled>Discard</Button>
            <Button color="rgba(0, 128, 0, 1)" type="submit">Save</Button>
          </Group>
        </Group>
      </Flex>
    </Flex>
  );
};
