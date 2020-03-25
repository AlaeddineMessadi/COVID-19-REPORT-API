import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .get('/brief', controller.brief)
  .get('/brief/timeseries', controller.briefTimeseries)
  .get('/latest', controller.latest)
  .get('/timeseries', controller.timeseries)
  .get('/countries', controller.countriesList)
  .get('/update', controller.selfUpdate);
