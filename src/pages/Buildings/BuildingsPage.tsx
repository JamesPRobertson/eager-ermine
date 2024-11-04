import { Flex } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import { ItemEntry, ItemSelect  } from "components/ItemSelect/ItemSelect";

import { useEffect, useState } from "react";

import { database } from "lib/database";
import { BuildingEditControls } from "./components/BuildingEditControls/BuildingEditControls";

export const BuildingsPage = () => {
  const { height, width } = useViewportSize();
  const [ selectedEntry, setSelectedEntry ] = useState<Building>();
  const [ listData, setListData ] = useState<any[]>();

  useEffect(() => {
    setListData(Object.entries(database.buildings).map(
      (entry: any, index: any) => <ItemEntry key={index} entry={entry} setter={setSelectedEntry}/>
    ))
  }, []);

  return (
    <Flex
      align="start"
      h={height - 40}
    >
      <ItemSelect height={height} data={listData} />
      <div style={{alignSelf: "stretch", width: 1, backgroundColor: "#444"}}/>
      <BuildingEditControls selected={selectedEntry} />
    </Flex>
  )
}
