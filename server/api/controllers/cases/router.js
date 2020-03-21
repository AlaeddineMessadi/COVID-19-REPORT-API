import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .get('/', controller.all)
  .get('/brief', controller.brief)
  .get('/:id', controller.byId);
