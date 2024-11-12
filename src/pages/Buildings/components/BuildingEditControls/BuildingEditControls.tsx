import { Button, Flex, Group, NumberInput, Space } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";
import { ObjectNameEntry } from "components/ObjectNameEntry/ObjectNameEntry";

type FormValues = {
  name: string;
  craftingSpeedFactor?: number;
  powerConsumption?: number;
};

const initialFormValues: FormValues = {
  name: "",
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
      p="md"
      direction="column"
      align="center"
      flex={1}
      style={{ backgroundColor: "rgba(30, 30, 30)" }}
      h="100%"
    >
      <Flex
        component="form"
        onSubmit={form.onSubmit((values) => {
          if (selected !== undefined) {
            database.updateBuilding({
              id: selected.id,
              name: values.name,
              powerConsumption: values.powerConsumption ?? 0,
              craftingSpeedFactor: values.craftingSpeedFactor ?? 1
            });
          }
          else {
            database.addBuilding({
              id: -1,
              name: values.name,
              powerConsumption: values.powerConsumption ?? 0,
              craftingSpeedFactor: values.craftingSpeedFactor ?? 1
            });
          }
          database.commitBuildings();
        })}
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
            <Button variant="outline" color="rgb(225, 16, 16)">
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
