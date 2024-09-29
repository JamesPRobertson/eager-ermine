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
}

export const database = new Database();
