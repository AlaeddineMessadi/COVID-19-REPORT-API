import iso2CountryLoc from '../data/iso2.json';
import fs from 'fs';

export const getMergedByCountry = list => {
  const mergedList = {};

  for (const item of list) {
    const countryName = item.countryregion;

    if (mergedList[countryName]) {
      const country = mergedList[countryName];

      // for latest api
      mergeConfirmDeathRecover(country, item);

      // for timeseries api
      if (item.timeseries) {
        const timeseries = item.timeseries;
        const mergedTimeseries = country.timeseries;

        for (const key of Object.keys(timeseries)) {
          mergeConfirmDeathRecover(mergedTimeseries[key], timeseries[key]);
        }
      }

      // Overwrite location
      if (item.countrycode) {
        const iso2 = item.countrycode.iso2;
        country.location = iso2CountryLoc[iso2];
      }
    } else {
      delete item.provincestate;
      mergedList[countryName] = item;
    }
  }

  return Object.values(mergedList);
};

export const mergeConfirmDeathRecover = (target, item) => {
  if (!(target && item)) return;

  if (item.confirmed) merge(target, item, 'confirmed');
  if (item.deaths) merge(target, item, 'deaths');
  if (item.recovered) merge(target, item, 'recovered');
};

export const merge = (target, item, key) => {
  const cur = target[key] ? target[key] : 0;
  const add = item[key] ? item[key] : 0;

  target[key] = cur + add;
};

export const filterByCode = (source = [], code = '') => {
  return source.filter(item => {
    let values = [];
    if (item.countrycode) {
      values = Object.values(item.countrycode);
    }
    const condition = values.indexOf(code.toUpperCase()) > -1;
    return condition;
  });
};

export const loadData = path => {
  try {
    return fs.readFileSync(path, 'utf8');
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const storeData = (path, data) => {
  try {
    fs.writeFileSync(path, JSON.stringify(data));
  } catch (err) {
    console.error(err);
  }
};
