import { Flex } from "@mantine/core";
import { database } from "lib/database";
import { useForm } from "@mantine/form";
import { ObjectNameEntry } from "components/ObjectNameEntry/ObjectNameEntry";
import { FormControlButtons } from "components/FormControlButtons/FormControlButtons";

type FormValues = {
  name: string;
};

const initialFormValues: FormValues = {
  name: ""
};

export const ItemEditControls = ({ selected }: { selected?: Item }) => {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: selected ?? initialFormValues,
    validate: {
      name: (value) => (value === "" ? "Name cannot be empty" : null)
    }
  });

  function handleSubmit(values: FormValues) {
    if (selected !== undefined) {
      database.updateItem({
        id: selected.id,
        name: values.name
      });
    } else {
      database.addItem({
        id: -1,
        name: values.name
      });
    }
    database.commitItems();
  }

  return (
    <Flex
      p="md"
      direction="column"
      gap="lg"
      align="center"
      flex={1}
      h="100%"
      style={{ backgroundColor: "rgba(30, 30, 30)" }}
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
    >
      <ObjectNameEntry form={form} placeholder="Item Name" />
      <FormControlButtons />
    </Flex>
  );
};
