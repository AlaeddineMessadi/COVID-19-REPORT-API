
import { parseCsvAll } from "../../utils/csvTools";

class CasesDatabase {
  constructor(data) {
    this._data = {};
    this._lastUpdate = 0;

    /** Initial update */
    this.selfUpdate()
  }

  setData(data) {
    this._data = data;
  }

  all() {
    return Promise.resolve(this._data);
  }

  brief() {
    return Promise.resolve(this._data.brief);
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  async selfUpdate() {
    console.log('selft upadte!')

    try {
      const result = parseCsvAll();
      this.setData(result);
      this._lastUpdate = new Date().toISOString();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}


export default new CasesDatabase();
