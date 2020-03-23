# COVID-19-REPORT-API

COVID-19-REPORT-API is an API Service to keep tracking  COVID-19 cases worldwide

[Preview]:https://covid-19-report-api.now.sh/	"Production link"


## Get Started

### Prerequisites
 [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install) installed

```shell
# clone the repo
$ git clone git@github.com:AlaeddineMessadi/COVID-19-REPORT-API.git

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

# Get me all latest cases in the world or in specific region or country
[GET]   /api/v1/cases/latest   # queries {iso: String , onlyCountries: Boolean}

#! iso parameter can be iso2 or iso3 for example: US or USA , CN or CHN

examples:
[GET]   /api/v1/cases/latest
[GET]   /api/v1/cases/latest?onlyCounties=true
[GET]   /api/v1/cases/latest?iso=US
[GET]   /api/v1/cases/latest?iso=US&onlyCounties=true

# Get me al timeseries in the world or in specific region or country
[GET]   /api/v1/cases/timeseries   # queries {iso: String , onlyCountries: Boolean}

examples:
[GET]   /api/v1/cases/timeseries
[GET]   /api/v1/cases/timeseries?onlyCounties=false
[GET]   /api/v1/cases/timeseries?iso=DE
[GET]   /api/v1/cases/latest?iso=CH&onlyCounties=true

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
[![Deploy with ZEIT Now](https://zeit.co/button)](https://deploy.now.sh/?repo=?template=https://github.com/AlaeddineMessadi/COVID-19-REPORT-API)



### MIT License

[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/) 
[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://github.com/AlaeddineMessadi)

