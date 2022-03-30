import dotenv from 'dotenv';
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  port: process.env.PORT,
  dbType: process.env.DB_TYPE,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  dbUserName: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  ormLogsEnabled: process.env.ORM_LOG_ENABLED,
  ormSyncEnabled: process.env.ORM_SYNC_DB,
  logs: {
    level: process.env.LOG_LEVEL,
  },
  endpointPrefix: process.env.ENDPOINT_PREFIX || 'api',
};
