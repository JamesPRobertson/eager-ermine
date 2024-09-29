// TODO: these should be documented a bit more :)

interface Item extends Object {
  id: number,
  name: string,
  tags?: any[]
}

type Building = {
  id: number,
  name: string,
  powerConsumption: number
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
  inputs: Input[],
  outputs: Output[],
  building: number,
  baseSpeed?: number
}
