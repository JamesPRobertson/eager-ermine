// TODO: these should be documented a bit more :)

type ItemTag = {
  name: string
}

interface Item extends Object {
  id: number,
  name: string,
  tags?: ItemTag[]
}

type Building = {
  id: number,
  name: string,
  powerConsumption: number,
  craftingSpeedFactor: number
}

type Input = {
  id: number,
  quantity: number
}

type Output = {
  id: number,
  quantity: number
}

type Recipe = {
  id: number,
  name: string,
  inputs: Input[],
  outputs: Output[],
  building: number,
  baseRate?: number
}

type ObjectEntry = {
  label: string;
  value: string;
};
