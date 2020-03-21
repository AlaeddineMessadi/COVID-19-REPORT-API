import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .get('/brief', controller.brief)
  .get('/latest', controller.latest)
  .get('/timeseries', controller.latest)
  .get('/update', controller.selfUpdate)
  .get('/:id', controller.byId);
