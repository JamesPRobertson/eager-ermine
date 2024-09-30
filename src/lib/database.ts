import { invoke } from "@tauri-apps/api/tauri";

class Database {
  items: {
    [index: number ]: Item
  }

  recipes: {
    [index: number ]: Recipe
  }

  buildings: {
    [index: number ]: Building
  }

  constructor() {
    this.items = {};
    this.recipes = {};
    this.buildings = {};
    this.buildItems();
    this.buildRecipes();
    this.buildBuildings();
  }

  addItem(newEntry: Item): void {
    if (this.items[newEntry.id] === undefined) {
      this.items[newEntry.id] = newEntry;
    }
    else {
      console.log(`ID ${newEntry.id} Already exists`);
    }
  }

  updateItem(entry: Item): void {
    if (this.items[entry.id] !== undefined) {
      this.items[entry.id] = entry;
    }
    else {
      console.log(`ID ${entry.id} Already exists`);
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
