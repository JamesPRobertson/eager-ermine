import { Combobox, Text, TextInput } from "@mantine/core";
import { database } from "lib/database";
import { useDebouncedState } from "@mantine/hooks";

import classes from "./itemSelect.module.css";

export const ItemEntry = ({ label }: { label: string }) => {
  return <Text>{label}</Text>;
};

type ObjectEntry = {
  label: string,
  value: string
}

// TODO: rename this to 'ObjectSelect' or similar
export const ItemSelect = ({ data, onSelect }: { data?: ObjectEntry[]; onSelect: (value: any) => void }) => {
  const [ search, setSearch ] = useDebouncedState<string>('', 200);

  console.log(search);

  const options =
    data &&
    data
    .filter((entry: ObjectEntry) => (entry.label.toLowerCase().includes(search.toLowerCase().trim())))
    .map((entry: ObjectEntry) => (
      <Combobox.Option value={`${entry.value}`} key={entry.value}>
        <ItemEntry label={entry.label} />
      </Combobox.Option>
    ));

  return (
    <div className={classes.container}>
      <Combobox
        onOptionSubmit={(value: any) => {
          console.log(value);
          onSelect(database.recipes[value]);
        }}
        classNames={{
          options: classes.itemEntry
        }}
      >
        <Combobox.EventsTarget>
          <TextInput
            placeholder="Search"
            variant="unstyled"
            className={classes.searchField}
            onChange={(event) => { setSearch(event.currentTarget.value) }}
          />
        </Combobox.EventsTarget>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox>
    </div>
  );
};
