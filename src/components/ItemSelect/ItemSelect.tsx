import { ScrollArea, Stack } from "@mantine/core"

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
