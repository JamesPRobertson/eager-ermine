// TODO: these should be documented a bit more :)

type ItemTag = {
  name: string
}

interface Entity {
  id: number;
  name: string;
}

interface Item extends Entity {
  tags?: ItemTag[]
}

interface Building extends Entity {
  powerConsumption: number,
  craftingSpeedFactor: number
}

interface Recipe extends Entity {
  inputs: ItemQuantity[],
  outputs: ItemQuantity[],
  building: number,
  baseRate?: number
}

type ItemQuantity = {
  id: number,
  quantity: number
}

type ObjectEntry = {
  label: string;
  value: string;
};
