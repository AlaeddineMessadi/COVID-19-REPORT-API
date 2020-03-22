import { parseCsvAll } from '../../utils/csvTools';
import { filterByCode } from '../../utils/helpers';
import logger from '../../common/logger';

import schedule from 'node-schedule';
/**
 * We load data from csv to the database when Initializing
 * https://github.com/CSSEGISandData/COVID-19
 */
class CasesDatabase {
  constructor() {
    this._data = {};
    this._lastUpdate = '';

    /** Initial update */
    this.selfUpdate();

    /** Execute a cron job every 6 hours  */
    schedule.scheduleJob('0 */6 * * *', () => {
      logger.info(`0 */6 * * * : `);
      this.selfUpdate();
    });
  }

  setData(data) {
    logger.info('Set Data');
    this._data = data;
  }

  all() {
    const count = this._data.length;
    const data = this._data;
    logger.info(`All count : `, count);
    return Promise.resolve({ count, data });
  }

  brief() {
    console.log(this._data.brief)
    if (!this._data.brief) {
      logger.warn('force update');
      this.selfUpdate();
    }

    logger.info(`Brief : `, this._data.brief);
    return Promise.resolve(this._data.brief);
  }

  latest(iso, onlyCountries) {
    if (!this._data.latest) {
      logger.warn('force update');
      this.selfUpdate();
    }

    let latest = onlyCountries
      ? this._data.latestOnlyCountries
      : this._data.latest;

    if (iso) latest = filterByCode(latest, iso);

    return Promise.resolve({ count: latest.length, data: latest });
  }

  timeseries(iso, onlyCountries) {
    if (!this._data.timeseries) {
      logger.warn('force update');
      this.selfUpdate();
    }
    let timeseries = onlyCountries
      ? this._data.timeseriesOnlyCountries
      : this._data.timeseries;

    if (iso) timeseries = filterByCode(timeseries, iso);

    return Promise.resolve({ count: timeseries.length, data: timeseries });
  }

  async selfUpdate() {
    logger.info('self UPDATE!');

    try {
      const result = await parseCsvAll();
      this.setData(result);
      this._lastUpdate = new Date().toISOString();

      logger.info(`Last update : `, this._lastUpdate);
      return Promise.resolve('SelfUpdate is done!');
    } catch (error) {
      logger.error(`SelfUpdate cannot be done : `, error);
      return Promise.reject('SelfUpdate cannot be done!');
    }
  }
}

export default new CasesDatabase();
