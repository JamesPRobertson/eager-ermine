import { Paper, Table } from "@mantine/core";

// Can these be nested with Tree components?
const TableEntry = ({ name, quantity, rate }: any) => {
  return (
    <Table.Tr>
      <Table.Td>{name}</Table.Td>
      <Table.Td ta="end">{quantity}</Table.Td>
      <Table.Td ta="end">{quantity * rate}</Table.Td>
      <Table.Td ta="end">{(quantity * rate) / 60}</Table.Td>
    </Table.Tr>
  );
};

export const ItemTable = ({ data, rate, ...props }: any) => {
  return (
    <Paper {...props} p="sm">
      <Table highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th ta="end">Quantity</Table.Th>
            <Table.Th ta="end">Per Minute</Table.Th>
            <Table.Th ta="end">Per Second</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data &&
            data.map((val: { name: string; quantity: number }) => <TableEntry key={val.name} {...val} rate={rate} />)}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};
