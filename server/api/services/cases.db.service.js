
import { parseCsvAll } from "../../utils/csvTools";


class CasesDatabase {
  constructor() {
    this._confirmed = [];
    this._deaths = [];
    this._recovered = [];
    this._counter = 0;

    this.insert('example 0');
    this.insert('example 1');
  }

  async all() {

    const result = await parseCsvAll()
    return Promise.resolve(result);
  }

  byId(id) {
    return Promise.resolve(this._confirmed[id]);
  }

  insert(name) {
    const record = {
      id: this._counter,
      name,
    };

    this._counter += 1;
    this._confirmed.push(record);

    return Promise.resolve(record);
  }
}

export default new CasesDatabase();
