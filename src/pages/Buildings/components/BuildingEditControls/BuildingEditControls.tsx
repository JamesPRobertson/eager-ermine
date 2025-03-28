import { Button, Flex, Group, NumberInput, Space } from "@mantine/core";

import { database } from "lib/database";
import { useForm } from "@mantine/form";
import { ObjectNameEntry } from "components/ObjectNameEntry/ObjectNameEntry";
import { FormControlButtons } from "components/FormControlButtons/FormControlButtons";

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

export const BuildingEditControls = ({ selected }: { selected?: Building }) => {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: selected ?? initialFormValues,
    validate: {
      name: (value) => (value === "" ? "Name cannot be empty" : null)
    }
  });

  function handleSubmit(values: FormValues) {
    if (selected !== undefined) {
      database.updateBuilding({
        id: selected.id,
        name: values.name,
        powerConsumption: values.powerConsumption ?? 0,
        craftingSpeedFactor: values.craftingSpeedFactor ?? 1
      });
    } else {
      database.addBuilding({
        id: -1,
        name: values.name,
        powerConsumption: values.powerConsumption ?? 0,
        craftingSpeedFactor: values.craftingSpeedFactor ?? 1
      });
    }
    database.commitBuildings();
  }

  return (
    <Flex
      p="md"
      direction="column"
      align="center"
      flex={1}
      style={{ backgroundColor: "rgba(30, 30, 30)" }}
      h="100%"
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <Flex direction="column" gap="lg" h="100%">
        <ObjectNameEntry form={form} placeholder="Building Name" />
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
      </Flex>
      <FormControlButtons />
    </Flex>
  );
};
