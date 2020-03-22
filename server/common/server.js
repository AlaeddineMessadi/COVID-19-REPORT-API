import Express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';

import l from './logger';
import errorHandler from '../api/middlewares/error.handler';

const app = new Express();
const exit = process.exit;

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(
      bodyParser.urlencoded({
        extended: true,
        limit: process.env.REQUEST_LIMIT || '100kb',
      })
    );
    app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
    app.use(errorHandler);
  }

  router(routes) {
    this.routes = routes;
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () =>
      l.info(
        `up and running in ${process.env.NODE_ENV ||
          'development'} @: ${os.hostname()} on port: ${p}}`
      );

    this.routes(app);
    try {
      http.createServer(app).listen(port, welcome(port));
    } catch (error) {
      l.error(error);
      exit(1);
    }

    return app;
  }
}
