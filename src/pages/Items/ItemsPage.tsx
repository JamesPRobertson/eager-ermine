import { Button, Flex } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import { ItemSelect } from "./components/ItemSelect/ItemSelect";
import { EditControls } from "./components/EditControls/EditControls";

import { useEffect, useState } from "react";

import { database } from "../../lib/database";

import classes from "./ItemsPage.module.css";

const ItemEntry = ({entry, setter}: any) => {
  return (
    <Button
      variant="subtle"
      color="gray"
      justify="start"
      key={entry[0]}
      onClick={() => {
        setter(entry[1])
      }}
    >
      {entry[1].name}
    </Button>
  )
}

export const ItemsPage = () => {
  const { height, width } = useViewportSize();
  const [ selectedItem, setSelectedItem ] = useState<Item>();
  const [ itemsListData, setItemsListData ] = useState<any[]>();

  useEffect(() => {
    setItemsListData(Object.entries(database.items).map(
      (entry: any, index: any) => <ItemEntry key={index} entry={entry} setter={setSelectedItem}/>
    ))
  }, [itemsListData]);

  return (
    <Flex
      className={classes.container}
      align="start"
      h={height - 40}
    >
      <ItemSelect height={height} data={itemsListData} />
      <div style={{alignSelf: "stretch", width: 1, backgroundColor: "#444"}}/>
      <EditControls selected={selectedItem} />
    </Flex>
  )
}
