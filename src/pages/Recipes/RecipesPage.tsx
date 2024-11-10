import { Flex } from "@mantine/core";
import { ObjectSelect } from "components/ObjectSelect/ObjectSelect";

import { useEffect, useState } from "react";

import { database } from "lib/database";
import { RecipeEditControls } from "./components/RecipeEditControls/RecipeEditControls";

export const RecipesPage = () => {
  const [selection, setSelection] = useState<Recipe>();
  const [itemsListData, setItemsListData] = useState<ObjectEntry[]>();

  // TODO: I think this should be moved to useMemo too.
  useEffect(() => {
    setItemsListData(
      Object.entries(database.recipes).map((entry: [string, Recipe]) => ({
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
          setSelection(database.recipes[index]);
        }}
        label="recipe"
      />
      <div style={{ alignSelf: "stretch", width: 1, backgroundColor: "#444" }} />
      <RecipeEditControls selectedRecipe={selection} key={selection?.id} />
    </Flex>
  );
};
