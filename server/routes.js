import casesRouter from './api/controllers/cases/router';

export default function routes(app) {
  app.use('/api/v1/cases', casesRouter);
  app.use('/api/v1', (req, res, next) => res.json({ message: 'API is working' }));
  app.use('/', (req, res, next) => res.json({
    title: 'CODIV-19 Report API',
    message: 'Version 1'
  }));
}
