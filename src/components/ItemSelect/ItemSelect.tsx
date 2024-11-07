import { Button, Combobox, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

import classes from "./itemSelect.module.css";
import { MdAdd } from "react-icons/md";

export const ItemEntry = ({ label }: { label: string }) => {
  return <Text>{label}</Text>;
};

type ItemSelectProps = {
  data?: ObjectEntry[];
  onSelect: (index: number) => void;
  label?: string
}

// TODO: rename this to 'ObjectSelect' or similar
export const ItemSelect = ({ data, onSelect, label }: ItemSelectProps) => {
  const [search, setSearch] = useDebouncedState<string>("", 200);

  const options =
    data &&
    data
      .filter((entry: ObjectEntry) => entry.label.toLowerCase().includes(search.toLowerCase().trim()))
      .map((entry: ObjectEntry) => (
        <Combobox.Option value={`${entry.value}`} key={entry.value}>
          <ItemEntry label={entry.label} />
        </Combobox.Option>
      ));

  return (
    <div className={classes.container}>
      <Combobox
        onOptionSubmit={(value: any) => {
          onSelect(value);
        }}
      >
        <Combobox.EventsTarget>
          <TextInput
            placeholder="Search"
            variant="unstyled"
            className={classes.searchField}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
            }}
          />
        </Combobox.EventsTarget>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox>
      <Button
        className={classes.addButton}
        variant="light"
        leftSection={<MdAdd size={20} />}
        onClick={() => {
          onSelect(-1)
        }}
      >
        Create a new {label}
      </Button>
    </div>
  );
};
