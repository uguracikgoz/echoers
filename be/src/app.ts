import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import helmet from 'helmet'
import { createConnection } from "typeorm";
import routes from "./routes";
import { logger } from './helpers'
import config from './config/index';

createConnection()
  .then(async (connection) => {
    const app = express() as Application;

    app.get('/status', (req, res) => {
      res.status(200).end();
    });
    app.head('/status', (req, res) => {
      res.status(200).end();
    });
    app.use(cors());
    app.use(helmet());
    app.use(bodyParser.json())
    app.use(`/${config.endpointPrefix}`, routes);
    app.set("json spaces", 4);
    app.listen(config.port);
    logger.info('Application is up');
  })
  .catch((error) => logger.error('Connection error', error));
