import { invoke } from "@tauri-apps/api/tauri";

class Database {
  buildings: {
    [index: number ]: Building
  }

  items: {
    [index: number ]: Item
  }

  recipes: {
    [index: number ]: Recipe
  }

  constructor() {
    this.buildings = {};
    this.items = {};
    this.recipes = {};
    this.buildBuildings();
    this.buildItems();
    this.buildRecipes();
  }

  addBuilding(newEntry: Building): void {
    this.addEntry(newEntry, this.buildings);
  }

  updateBuilding(entry: Building): void {
    this.updateEntry(entry, this.buildings);
  }

  addItem(newEntry: Item): void {
    this.addEntry(newEntry, this.items);
  }

  updateItem(entry: Item): void {
    this.updateEntry(entry, this.items);
  }

  addRecipe(newEntry: Recipe): void {
    this.addEntry(newEntry, this.recipes);
  }

  updateRecipe(entry: Recipe): void {
    this.updateEntry(entry, this.recipes);
  }

  addEntry(newEntry: Entity, container: {[index: number]: Entity}) {
    if (container[newEntry.id] === undefined) {
      if (newEntry.id === -1) {
        newEntry.id = Object.keys(container).length;
      }

      container[newEntry.id] = newEntry;
    }
    else {
      throw `ID ${newEntry.id} already exists`;
    }
  }

  updateEntry(entry: Entity, container: {[index: number]: Entity}) {
    if (container[entry.id] !== undefined) {
      container[entry.id] = entry;
    }
    else {
      console.log(`ID ${entry.id} doesnt' exist`);
    }
  }

  buildDB(): string {
    let output: any = invoke('read_file').then((out) => {return out});
    console.log(output);

    return output as string;
  }

  buildItems(): void {
    invoke('read_file', {path: "/Users/james/Projects/tauri/eager-ermine/dist/items.json"})
      .then((content: any) => {
        this.items = JSON.parse(content).items;
      });
  }

  commitBuildings(): void {
    console.log(JSON.stringify(this.buildings, null, 2));

    invoke('write_file', {
      path: "/Users/james/Projects/tauri/eager-ermine/dist/buildings.json",
      data: JSON.stringify({buildings: this.buildings}, null, 2)
    })
      .then(
        (response: any) => {
          console.log(response);
        }
      )
  }

  commitItems(): void {
    console.log(JSON.stringify(this.items, null, 2));

    invoke('write_file', {
      path: "/Users/james/Projects/tauri/eager-ermine/dist/items.json",
      data: JSON.stringify({items: this.items}, null, 2)
    })
      .then(
        (response: any) => {
          console.log(response);
        }
      )
  }

  commitRecipes(): void {
    console.log(JSON.stringify(this.recipes, null, 2));
    console.warn("Exiting commitRecipes()!!");

    invoke('write_file', {
      path: "/Users/james/Projects/tauri/eager-ermine/dist/recipes.json",
      data: JSON.stringify({recipes: this.recipes}, null, 2)
    })
      .then(
        (response: any) => {
          console.log(response);
        }
      )
  }

  buildRecipes(): void {
    invoke('read_file', {path: "/Users/james/Projects/tauri/eager-ermine/dist/recipes.json"})
      .then((content: any) => {
        this.recipes = JSON.parse(content).recipes;
        console.log(this.recipes);
      });
  }

  buildBuildings(): void {
    invoke('read_file', {path: "/Users/james/Projects/tauri/eager-ermine/dist/buildings.json"})
      .then((content: any) => {
        this.buildings = JSON.parse(content).buildings;
        console.log(this.buildings);
      });
  }
}

export const database = new Database();
