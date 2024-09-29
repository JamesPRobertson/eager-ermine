// TODO: these should be documented a bit more :)

interface Item extends Object {
  id: number,
  name: string,
  tags?: any[]
}

type Building = {
  id: number,
  name: string
}


type Recipe = {
  id: number,
  inputs: number[],
  outputs: number[],
  building: number,
  speed?: number
}
