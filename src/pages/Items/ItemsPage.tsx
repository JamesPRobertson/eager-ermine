import { Flex } from "@mantine/core";
import { ObjectSelect } from "components/ObjectSelect/ObjectSelect";
import { EditControls } from "./components/ItemEditControls/ItemEditControls";

import { useEffect, useState } from "react";

import { database } from "lib/database";

export const ItemsPage = () => {
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [itemsListData, setItemsListData] = useState<ObjectEntry[]>();

  useEffect(() => {
    setItemsListData(
      Object.entries(database.items).map((entry: [string, Item]) => ({
        label: `${entry[1].name}`,
        value: `${entry[1].id}`
      }))
    );
  }, []);

  return (
    <Flex align="start" h="100%">
      <ObjectSelect
        data={itemsListData}
        onSelect={(index: number) => {
          setSelectedItem(database.items[index]);
        }}
        label="item"
      />
      <div style={{ alignSelf: "stretch", width: 1, backgroundColor: "#333" }} />
      <EditControls selected={selectedItem} />
    </Flex>
  );
};
