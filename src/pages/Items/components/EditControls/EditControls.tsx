import { Button, Container, Text } from "@mantine/core"

import { database } from "../../../../lib/database"

function getRandomName(): string {
  let materials: string[] = [
    "Iron",
    "Steel",
    "Aluminum",
    "Meaty",
    "Air",
    "Glass",
    "Extreme",
    "Nuclear",
    "Uranium",
    "Dusty",
    "Porky",
    "Big"
  ];

  let device: string[] = [
    "rod",
    "sheet",
    "ingot",
    "sphere",
    "claw",
    "sword",
    "ball",
    "shell",
    "cannon",
    "hammer",
    "globe",
    "gun"
  ]
  let firstIndex = Math.floor((Math.random() * 100) % materials.length);
  let secondIndex = Math.floor((Math.random() * 100) % device.length);
  return `${materials[firstIndex]} ${device[secondIndex]}`;
}

export const EditControls = ({selected}: {selected?: string}) => {
  return (
    <Container>
      <Text>
        You have { selected ? selected : "nothing"} selected.
      </Text>
      <Button
        onClick={ () => {
          for (let i = 0; i < 256; i++) {
            database.addItem({
              id: i,
              name: getRandomName()
            })
          }
          console.log(database.items);
        }
      }>Add Items</Button>
    </Container>
  )
}
