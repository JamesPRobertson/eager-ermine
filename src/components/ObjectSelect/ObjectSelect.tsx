import { Button, Combobox, Text, TextInput, useCombobox } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";

import classes from "./ObjectSelect.module.css";
import { MdAdd } from "react-icons/md";

import { useState } from "react";

const ObjectEntry = ({ label }: { label: string }) => {
  return <Text>{label}</Text>;
};

type ObjectSelectProps = {
  data?: ObjectEntry[];
  onSelect: (index: number) => void;
  label?: string;
};

export const ObjectSelect = ({ data, onSelect, label }: ObjectSelectProps) => {
  const [search, setSearch] = useDebouncedState<string>("", 200);
  const [active, setActive] = useState<string | null>();

  const combobox = useCombobox();

  const options =
    data &&
    data
      .filter((entry: ObjectEntry) => entry.label.toLowerCase().includes(search.toLowerCase().trim()))
      .map((entry: ObjectEntry) => (
        <Combobox.Option value={`${entry.value}`} active={entry.value === active} key={entry.value}>
          <ObjectEntry label={entry.label} />
        </Combobox.Option>
      ));

  return (
    <div className={classes.container}>
      <Combobox
        store={combobox}
        onOptionSubmit={(value: any) => {
          onSelect(value);
          combobox.updateSelectedOptionIndex(value);
          setActive(value);
        }}
        classNames={classes}
      >
        <Combobox.EventsTarget>
          <TextInput
            placeholder={"Search" + (label && ` ${label}s`)}
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
        leftSection={<MdAdd size="2em" />}
        onClick={() => {
          onSelect(-1);
          combobox.updateSelectedOptionIndex(undefined);
          setActive(null);
        }}
      >
        New {label}
      </Button>
    </div>
  );
};
