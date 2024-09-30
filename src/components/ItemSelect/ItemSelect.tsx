import { Button, ScrollArea, Stack } from "@mantine/core"

export const ItemEntry = ({entry, setter, displayName}: any) => {
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
      { displayName ?? entry[1].name}
    </Button>
  )
}

export const ItemSelect = ({height, data}: {height: number, data: any}) => {
  return (
    <ScrollArea.Autosize
      mah={height - 40}
    >
      <Stack
        gap={1}
        style={{width: 250}}
        p="xs"
      >
        {data}
      </Stack>
    </ScrollArea.Autosize>
  )
}
