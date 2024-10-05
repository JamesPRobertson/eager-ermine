import { Flex } from "@mantine/core"
import { useViewportSize } from "@mantine/hooks";
import { ItemEntry, ItemSelect  } from "components/ItemSelect/ItemSelect";

import { useEffect, useState } from "react";

import { database } from "lib/database";
import { RecipeEditControls } from "./components/RecipeEditControls/RecipeEditControls";

export const RecipesPage = () => {
  const { height, width } = useViewportSize();
  const [ selection, setSelection ] = useState<Recipe>();
  const [ itemsListData, setItemsListData ] = useState<any[]>();

  // TODO: I think this should be moved to useMemo too.
  useEffect(() => {
    setItemsListData(Object.entries(database.recipes).map(
      (entry: any, index: any) => (
        <ItemEntry
          key={index}
          entry={entry}
          displayName={database.items[entry[1].outputs[0].id].name}
          setter={setSelection}
        />
      )
    ))
  }, [itemsListData]);

  return (
    <Flex
      align="start"
      h={height - 40}
    >
      <ItemSelect height={height} data={itemsListData} />
      <div style={{alignSelf: "stretch", width: 1, backgroundColor: "#444"}}/>
      <RecipeEditControls height={height} selectedRecipe={selection}  />
    </Flex>
  )
}
