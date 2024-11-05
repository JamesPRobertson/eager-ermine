import { Flex } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { ItemSelect } from "components/ItemSelect/ItemSelect";

import { useEffect, useState } from "react";

import { database } from "lib/database";
import { RecipeEditControls } from "./components/RecipeEditControls/RecipeEditControls";

export const RecipesPage = () => {
  const { height } = useViewportSize();
  const [selection, setSelection] = useState<Recipe>();
  const [itemsListData, setItemsListData] = useState<any[]>();

  // TODO: I think this should be moved to useMemo too.
  useEffect(() => {
    setItemsListData(
      Object.entries(database.recipes).map((entry: [string, Recipe]) => ({
        label: entry[1].name,
        value: entry[1].id
      }))
    );
  }, []);

  return (
    <Flex align="start" h={height - 40}>
      <ItemSelect data={itemsListData} onSelect={(index) => { setSelection(database.recipes[index]) }} />
      <div style={{ alignSelf: "stretch", width: 1, backgroundColor: "#444" }} />
      <RecipeEditControls height={height} selectedRecipe={selection} key={selection?.id} />
    </Flex>
  );
};
