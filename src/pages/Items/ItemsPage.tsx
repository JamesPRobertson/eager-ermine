import { Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { ItemSelect } from "components/ItemSelect/ItemSelect";
import { EditControls } from "./components/ItemEditControls/ItemEditControls";

import { useEffect, useState } from "react";

import { database } from "lib/database";

export const ItemsPage = () => {
  const { height } = useViewportSize();
  const [selectedItem, setSelectedItem] = useState<Item>();
  const [itemsListData, setItemsListData] = useState<any[]>();

  useEffect(() => {
    setItemsListData(
      Object.entries(database.items).map((entry: [string, Item]) => ({
        label: entry[1].name,
        value: entry[1].id
      }))
    );
  }, []);

  return (
    <Flex align="start" h={height - 40}>
      <ItemSelect
        data={itemsListData}
        onSelect={(index: number) => {
          setSelectedItem(database.items[index]);
        }}
      />
      <div style={{ alignSelf: "stretch", width: 1, backgroundColor: "#444" }} />
      <EditControls selected={selectedItem} />
    </Flex>
  );
};
