import csvToJson from 'csvtojson';
import request from 'request';

export const parseCsv = (dataSource, path, category) => {
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