import { Flex } from "@mantine/core";
import { ObjectSelect } from "components/ObjectSelect/ObjectSelect";

import { useEffect, useState } from "react";

import { database } from "lib/database";
import { BuildingEditControls } from "./components/BuildingEditControls/BuildingEditControls";

export const BuildingsPage = () => {
  const [selectedEntry, setSelectedEntry] = useState<Building>();
  const [listData, setListData] = useState<ObjectEntry[]>();

  useEffect(() => {
    setListData(
      Object.entries(database.buildings).map((entry: [string, Building]) => ({
        label: `${entry[1].name}`,
        value: `${entry[1].id}`
      }))
    );
  }, []);

  return (
    <Flex align="start" h="100%">
      <ObjectSelect
        data={listData}
        onSelect={(index: number) => {
          setSelectedEntry(database.buildings[index]);
        }}
        label="building"
      />
      <div style={{ alignSelf: "stretch", width: 1, backgroundColor: "#444" }} />
      <BuildingEditControls selected={selectedEntry} key={selectedEntry?.id} />
    </Flex>
  );
};
