# COVID-19-REPORT-API

COVID-19-REPORT-API is an API Service to keep tracking  COVID-19 cases worldwide

[Preview](https://covid-19-report-api.now.sh)

<div align="center">
	<br> <img src="/static/corona-mask.png" width="80px"> <br> <hr>
</div>


## Get Started

### Prerequisites
 [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install) installed

```shell
# clone the repo
$ git clone https://github.com/AlaeddineMessadi/COVID-19-REPORT-API.git

# install dependencies
$ yarn    ## or npm install

# run in development mode
$ yarn dev   ## npm run dev

# run tests
$ yarn test  ## npm run test
```



## Run the service
#### Run in *development* mode:
Runs the application is development mode. Should not be used in production

```shell
$ yarn dev
## or with debug
$ yarn dev:debug
```

#### Run in *production* mode:

Compiles the application and starts it in production production mode.

```shell
$yarn compile
$ yarn start
```

## Documentation


```markdown
# Get me a brief report
[GET]   /api/v1/cases/brief

# Get me a brief timeseries 
[GET]   /api/v1/cases/brief/timeseries

# Get me all latest cases in the world or in specific region or country
[GET]   /api/v1/cases/latest   # parameters {iso: String, province: String, onlyCountries: Boolean}

#! iso parameter can be iso2 or iso3 for example: US or USA , CN or CHN

examples:
[GET]   /api/v1/cases/latest
[GET]   /api/v1/cases/latest?onlyCounties=true
[GET]   /api/v1/cases/latest?iso=US
[GET]   /api/v1/cases/latest?iso=US&onlyCounties=true
[GET]   /api/v1/cases/latest?onlyCounties=true
[GET]   /api/v1/cases/latest?iso=AU&province=New+South+Wales
[GET]   /api/v1/cases/latest?province=New+South+Wales

# Get me all timeseries in the world or in specific region or country
[GET]   /api/v1/cases/timeseries   # parameters {iso: String, province: String, onlyCountries: Boolean}

examples:
[GET]   /api/v1/cases/timeseries
[GET]   /api/v1/cases/timeseries?onlyCounties=false
[GET]   /api/v1/cases/timeseries?iso=DE
[GET]   /api/v1/cases/timeseries?iso=AU&province=New+South+Wales
[GET]   /api/v1/cases/timeseries?province=New+South+Wales
[GET]   /api/v1/cases/timeseries?iso=CH&onlyCounties=true

# Secret me list of contries/regions with iso2 and iso3
[GET]   /api/v1/cases/countries

# Secret endpoint to update Database
[GET]   /api/v1/cases/udpate?secret=secret

#! change your secret in the .env file


# Get ALL 
[GET]   /api/v1/cases

#! response will be huge!! 
```

## Test It

Run the Mocha unit tests  **TO DO: ** more tests to implement

```shell
$ yarn test
## or
$ yarn test:debug
```

## Try It
* Open you're browser to [http://localhost:3000](http://localhost:3000)
* Invoke the `/cases` endpoint 
  ```shell
  curl http://localhost:3000/api/v1/cases/brief
  ```

## Lint It

Fix all prettier linter errors

```shell
$ yarn lint
```

[![Total alerts](https://img.shields.io/lgtm/alerts/g/AlaeddineMessadi/COVID-19-REPORT-API.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/AlaeddineMessadi/COVID-19-REPORT-API/alerts/)

## Deployment

```shell
$ now
```
[![Deploy with ZEIT Now](https://zeit.co/button)](https://deploy.now.sh/?repo=https://github.com/AlaeddineMessadi/COVID-19-REPORT-API)

### Data Source

data repository for the 2019 Novel Coronavirus Visual Dashboard operated by the Johns Hopkins University Center for Systems Science and Engineering ([JHU CSSE](https://github.com/CSSEGISandData/COVID-19))

### MIT License

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) 
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/AlaeddineMessadi)



## Support:
<a href="https://www.patreon.com/AlaeddineMessadi">
	<img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width="160">
</a>

