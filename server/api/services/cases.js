import logger from '../../common/logger';
import db from './cases.db.service';

class CasesService {
  all() {
    logger.info(`${this.constructor.name}.all()`);
    return db.all();
  }

  brief() {
    logger.info(`${this.constructor.name}.brief()`);
    return db.brief();
  }

  briefTimeseries() {
    logger.info(`${this.constructor.name}.briefTimeseries()`);
    return db.briefTimeseries();
  }

  latest(iso, province, onlyCountries) {
    logger.info(`${this.constructor.name}.latest()`);
    return db.latest(iso, province, onlyCountries);
  }

  timeseries(iso, province, onlyCountries) {
    logger.info(`${this.constructor.name}.timeseries()`);
    return db.timeseries(iso, province, onlyCountries);
  }

  getCountriesList() {
    logger.info(`${this.constructor.name}.getCountriesList()`);
    return db.getCountriesList();
  }

  selfUpdate(secret) {
    if (secret !== process.env.SESSION_SECRET) {
      return Promise.reject('Wrong secret');
    }
    return db.selfUpdate();
  }
}

export default new CasesService();
