import lookup from 'country-code-lookup';
import nestedProperty from 'nested-property';
import { csvPaths } from '../data';
import { getMergedByCountry, storeData } from './helpers';
import { COLUMN, CODES } from './constants';
import { parseCsv } from './parser';

const responseSet = {
  brief: '{}',
  latest: '{}',
  latestOnlyCountries: '{}',
  timeseries: '{}',
  timeseriesOnlyCountries: '{}'
}

let lastUpdate;

export const parseCsvAll = () => {
  console.log('Updated at ' + new Date().toISOString())

  const dataSource = {
    confirmed: {},
    deaths: {},
    recovered: {}
  }
  lastUpdate = new Date().toISOString()
  const resultsPromise = []

  Object.entries(csvPaths).forEach(([category, path]) => {
    resultsPromise.push(parseCsv(dataSource, path, category))
  });


  return Promise.all(resultsPromise)
    .then((_values) => {
      const brief = {
        [COLUMN.CONFIRMED]: 0,
        [COLUMN.DEATHS]: 0,
        [COLUMN.RECOVERED]: 0
      }
      const latest = {}
      const timeseries = {}

      for (const [category, value] of Object.entries(dataSource)) {
        for (const [name, item] of Object.entries(value)) {
          const keys = Object.keys(item)
          const cell = item[keys[keys.length - 1]]
          const latestCount = cell ? Number(cell) : Number(item[keys[keys.length - 2]])

          /**
           * brief
           */
          brief[category] += latestCount

          /**
           * latest
           */
          createPropertyIfNeed(latest, name, item)
          latest[name][category] = latestCount

          /**
           * timeseries
           */
          createPropertyIfNeed(timeseries, name, item)
          for (const date of keys.slice(4)) {
            nestedProperty.set(timeseries[name], `timeseries.${date}.${category}`, Number(item[date]))
          }
        }
      }

      responseSet.brief = brief
      responseSet.latest = Object.values(latest)
      responseSet.timeseries = Object.values(timeseries)

      const copyLatest = JSON.parse(JSON.stringify(latest))
      responseSet.latestOnlyCountries = getMergedByCountry(Object.values(copyLatest))
      const copyTimeseries = JSON.parse(JSON.stringify(timeseries))
      responseSet.timeseriesOnlyCountries = getMergedByCountry(Object.values(copyTimeseries))

      console.log(`Confirmed: ${brief.confirmed}, Deaths: ${brief.deaths}, Recovered: ${brief.recovered}`)

      storeData('./server/utils/response.json', responseSet)

      return Promise.resolve(responseSet);
    })
    .catch((error) => {
      console.log('Error on Results Promise: ' + error)
    })
}


function createPropertyIfNeed(target, name, item) {
  if (!nestedProperty.has(target, name)) {
    target[name] = {
      [COLUMN.PROVINCE_STATE]: item['Province/State'],
      [COLUMN.COUNTRY_REGION]: item['Country/Region'],
      [COLUMN.LAST_UPDATE]: lastUpdate,
      location: {
        lat: Number(item.Lat),
        lng: Number(item.Long)
      }
    }

    const countryName = item['Country/Region']
    if (lookup.byCountry(countryName)) {
      appendCountryCode(lookup.byCountry(countryName))
    } else if (CODES[countryName]) {
      appendCountryCode(lookup.byCountry(CODES[countryName]))
    }

    function appendCountryCode(countryCode) {
      target[name].countrycode = {
        iso2: countryCode.iso2,
        iso3: countryCode.iso3
      }
    }
  }
}

