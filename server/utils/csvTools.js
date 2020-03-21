import csvToJson from 'csvtojson';
import request from 'request';
import lookup from 'country-code-lookup';
import nestedProperty from 'nested-property';
import { csvPaths } from '../data';
import fixedCountryCodes from '../data/country-codes.json'
import { getMergedByCountry } from './helpers';
import { column } from './constants';

const responseSet = {
  brief: '{}',
  latest: '{}',
  latestOnlyCountries: '{}',
  timeseries: '{}',
  timeseriesOnlyCountries: '{}'
}

let lastUpdate;


const parseCsv = (dataSource, path, category) => {
  return csvToJson()
    .fromStream(request.get(path))
    .subscribe((json) => {
      if (json['Province/State']) {
        const provincestate = json['Province/State']
        dataSource[category][provincestate] = json
      } else if (json['Country/Region']) {
        const countryregion = json['Country/Region']
        dataSource[category][countryregion] = json
      }

      return new Promise((resolve, reject) => {
        resolve()
      })
    })
}

export const parseCsvAll = () => {
  console.log('Updated at ' + new Date().toISOString())

  const dataSource = {
    confirmed: {},
    deaths: {},
    recovered: {}
  }
  lastUpdate = new Date().toISOString()
  const queryPromise = []

  Object.entries(csvPaths).forEach(([category, path]) => {
    queryPromise.push(parseCsv(dataSource, path, category))
  });


  return Promise.all(queryPromise)
    .then((_values) => {
      const brief = {
        [column.CONFIRMED]: 0,
        [column.DEATHS]: 0,
        [column.RECOVERED]: 0
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

      return Promise.resolve(responseSet);
    })
    .catch((error) => {
      console.log('Error on queryPromise: ' + error)
    })
}


function createPropertyIfNeed(target, name, item) {
  if (!nestedProperty.has(target, name)) {
    target[name] = {
      [column.PROVINCE_STATE]: item['Province/State'],
      [column.COUNTRY_REGION]: item['Country/Region'],
      [column.LAST_UPDATE]: lastUpdate,
      location: {
        lat: Number(item.Lat),
        lng: Number(item.Long)
      }
    }

    const countryName = item['Country/Region']
    if (lookup.byCountry(countryName)) {
      appendCountryCode(lookup.byCountry(countryName))
    } else if (fixedCountryCodes[countryName]) {
      appendCountryCode(lookup.byCountry(fixedCountryCodes[countryName]))
    }

    function appendCountryCode(countryCode) {
      target[name].countrycode = {
        iso2: countryCode.iso2,
        iso3: countryCode.iso3
      }
    }
  }
}

