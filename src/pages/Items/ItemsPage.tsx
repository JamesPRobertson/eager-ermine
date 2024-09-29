import { Button, Group } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import { ItemSelect } from "./components/ItemSelect/ItemSelect";
import { EditControls } from "./components/EditControls/EditControls";

import { useState } from "react";

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
        setter(entry[1].name)
      }}
    >
      {entry[1].name}
    </Button>
  )
}

export const ItemsPage = () => {
  const { height, width } = useViewportSize();
  const [ selectedItem, setSelectedItem ] = useState<string>();
  const [testData, setTestData] = useState<any[]>();

  return (
    <Group
      className={classes.container}
      align="start"
      h={height - 40}
    >
      <ItemSelect height={height} data={testData} />
      <div style={{alignSelf: "stretch", width: 1, backgroundColor: "#444"}}/>
      <EditControls selected={selectedItem} />
      <Button
        onClick={ () => {
            setTestData(Object.entries(database.items).map(
              (entry: any, index: any) => <ItemEntry entry={entry} setter={setSelectedItem}/>
            ))
          }
        }
      >
        Fill
      </Button>
    </Group>
  )
}
