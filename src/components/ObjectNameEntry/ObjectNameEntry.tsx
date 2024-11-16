import { TextInput } from "@mantine/core";

import classes from "./ObjectNameEntry.module.css";

type ObjectNameEntryProps = {
  form: any;
  formKey?: string;
  placeholder?: string;
};

export const ObjectNameEntry = ({ form, formKey="name", placeholder }: ObjectNameEntryProps) => {
  return (
    <TextInput
      classNames={{
        input: classes.input
      }}
      variant="unstyled"
      placeholder={placeholder ?? "Name"}
      size="xl"
      miw={500}
      key={form.key(formKey)}
      {...form.getInputProps(formKey)}
    />
  );
};
