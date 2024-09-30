import { Flex } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import { ItemEntry, ItemSelect  } from "components/ItemSelect/ItemSelect";

import { useEffect, useState } from "react";

import { database } from "lib/database";

export const RecipesPage = () => {
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
      align="start"
      h={height - 40}
    >
      <ItemSelect height={height} data={itemsListData} />
      <div style={{alignSelf: "stretch", width: 1, backgroundColor: "#444"}}/>
    </Flex>
  )
}
