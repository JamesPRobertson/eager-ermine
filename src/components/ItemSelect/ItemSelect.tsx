import { Combobox, Text, TextInput } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

import classes from "./itemSelect.module.css";

export const ItemEntry = ({ label }: { label: string }) => {
  return <Text>{label}</Text>;
};

type ObjectEntry = {
  label: string;
  value: string;
};

// TODO: rename this to 'ObjectSelect' or similar
export const ItemSelect = ({ data, onSelect }: { data?: ObjectEntry[]; onSelect: (index: number) => void }) => {
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
    </div>
  );
};
