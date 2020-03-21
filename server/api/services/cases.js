// import console from '../../common/logger';
import db from './cases.db.service';


class CasesService {
  all() {
    console.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  brief() {
    console.info(`${this.constructor.name}.brief()`);
    return db.brief();
  }

  latest(iso, onlyCountries) {
    console.info(`${this.constructor.name}.latest()`);
    return db.latest(iso, onlyCountries);
  }

  timeseries(iso2, iso3, onlyCountries) {
    console.info(`${this.constructor.name}.timeseries()`);
    return db.timeseries(iso2, iso3, onlyCountries);
  }

  byId(id) {
    console.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  selfUpdate(secret) {
    if (secret !== process.env.SESSION_SECRET) {
      return Promise.reject('Wrong secret');
    }
    return db.selfUpdate();
  }
}

export default new CasesService();
