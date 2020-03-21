
import { parseCsvAll } from "../../utils/csvTools";
import { filterIso2code, filterIso3code, dataSetFilter } from "../../utils/helpers";

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

  latest(iso2, iso3, onlyCountries) {
    let latest = onlyCountries ? this._data.latestOnlyCountries : this._data.latest

    if (iso2) latest = filterIso2code(latest, iso2)
    if (iso3) latest = filterIso3code(latest, iso3)

    return Promise.resolve({ count: latest.length, data: latest });
  }

  timeseries(iso2, iso3, onlyCountries) {
    let timeseries = onlyCountries ? this._data.timeseriesOnlyCountries : this._data.timeseries;

    const result = dataSetFilter(iso2, iso2, timeseries);
    return Promise.resolve(result);
  }

  byId(id) {
    return Promise.resolve(this._data[id]);
  }

  async selfUpdate() {
    console.log('self UPDATE!')

    try {
      const result = await parseCsvAll();
      this.setData(result);
      this._lastUpdate = new Date().toISOString();

      return Promise.resolve(true);
    } catch (error) {
      return Promise.resolve(false);
    }
  }
}


export default new CasesDatabase();
