import { invoke } from "@tauri-apps/api/tauri";

class Database {
  items: {
    [index: number ]: Item
  }

  constructor() {
    this.items = {};
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
}

export const database = new Database();
