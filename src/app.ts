import './bootstrap';
import {Express, Request, Response, NextFunction} from 'express';
import express from 'express';
import Youch from 'youch';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import database from './database';
import FFError from './app/Error/FFError';

class App {

  server: Express;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }

  close() {
    database.close()
  }

  exceptionHandler() {
    this.server.use(async (err: FFError , req: Request, res: Response, next: NextFunction) => {
      if (err.name === 'FastFeetError') {
        return res.status(err.status).json(err.body);
      }
      if (process.env.NODE_ENV !== 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App();
