import { parseCsvAll } from '../../utils/csvTools';
import { filterByCode, storeData, parseLatestResponse, filterByProvince, isProvinceState } from '../../utils/helpers';
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

  async all() {
    if (!this._data.brief) {
      logger.warn('force update');
      try {
        const r = await this.selfUpdate();
      } catch (error) {
        logger.error('Cannot force update', error)
      }
    }

    const lastUpdate = this._lastUpdate;
    const count = this._data.length;
    const data = this._data;
    logger.info(`All count : `, count);
    return Promise.resolve({ lastUpdate, count, data });
  }

  async brief() {
    if (!this._data.brief) {
      logger.warn('force update');
      try {
        const r = await this.selfUpdate();
      } catch (error) {
        logger.error('Cannot force update', error)
      }
    }


    logger.info(`Brief : `, this._data.brief);
    const lastUpdate = this._lastUpdate;
    return Promise.resolve({ lastUpdate, data: this._data.brief });
  }

  async latest(iso, province, onlyCountries) {
    if (!this._data.latest) {
      logger.warn('force update');
      try {
        const r = await this.selfUpdate();
      } catch (error) {
        logger.error('Cannot force update', error)
      }
    }

    let latest = onlyCountries
      ? this._data.latestOnlyCountries
      : this._data.latest;

    if (iso && !province && isProvinceState(latest, iso)) {
      /** check incase client want only countries */
      latest = this._data.latestOnlyCountries;
    }

    if (iso) latest = filterByCode(latest, iso);
    if (province) latest = filterByProvince(latest, province);

    const lastUpdate = this._lastUpdate;
    return Promise.resolve({ lastUpdate, count: latest.length, data: latest });
  }

  async timeseries(iso, province, onlyCountries) {
    if (!this._data.timeseries) {
      logger.warn('force update');
      try {
        const r = await this.selfUpdate();
      } catch (error) {
        logger.error('Cannot force update', error)
      }
    }

    let timeseries = onlyCountries
      ? this._data.timeseriesOnlyCountries
      : this._data.timeseries;


    if (iso && !province && isProvinceState(timeseries, iso)) {
      /** check incase client want only countries */
      latest = this._data.timeseriesOnlyCountries;
    }

    if (iso) timeseries = filterByCode(timeseries, iso);
    if (province) timeseries = filterByProvince(timeseries, province);

    const lastUpdate = this._lastUpdate;

    return Promise.resolve({ lastUpdate, count: timeseries.length, data: timeseries });
  }

  async getCountriesList() {
    if (!this._data.latest) {
      logger.warn('force update');
      try {
        const r = await this.selfUpdate();
      } catch (error) {
        logger.error('Cannot force update', error)
      }
    }

    return Promise.resolve(parseLatestResponse(this._data.latest))
  }

  async selfUpdate() {
    logger.info('self UPDATE triggered!');

    try {
      const r = await parseCsvAll();
      if (!r) {
        logger.error(`ParseCsv return undefined  `, e);
        return Promise.reject('SelfUpdate cannot be done!');
      }
      this.setData(r);
      this._lastUpdate = new Date().toISOString();
      logger.info(`Last update : `, this._lastUpdate);
      return Promise.resolve('SelfUpdate is done!');
    }
    catch (e) {
      logger.error(`SelfUpdate cannot be done : `, e);
      return Promise.reject('SelfUpdate cannot be done!');
    }
  }
}

export default new CasesDatabase();
