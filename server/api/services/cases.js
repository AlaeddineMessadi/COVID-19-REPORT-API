import l from '../../common/logger';
import db from './cases.db.service';


class CasesService {
  all() {
    l.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  brief() {
    l.info(`${this.constructor.name}.brief()`);
    return db.brief();
  }

  latest(iso, onlyCountries) {
    l.info(`${this.constructor.name}.latest()`);
    return db.latest(iso, onlyCountries);
  }

  timeseries(iso2, iso3, onlyCountries) {
    l.info(`${this.constructor.name}.timeseries()`);
    return db.timeseries(iso2, iso3, onlyCountries);
  }

  byId(id) {
    l.info(`${this.constructor.name}.byId(${id})`);
    return db.byId(id);
  }

  selfUpdate(name) {
    return db.selfUpdate();
  }
}

export default new CasesService();
