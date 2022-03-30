/* eslint-disable @typescript-eslint/no-var-requires */
const config =
  process.env.NODE_ENV === 'production'
    ? require('./build/config/index').default
    : require('./src/config/index').default;

const devConfig = {
    type: config.dbType,
    host: config.dbHost,
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: config.ormSyncEnabled,
    logging: config.ormLogsEnabled,
    entities: ['./src/entity/*.ts'],
    cli: {
        entitiesDir: 'src/api/entities',
    },
    migrations: [
        "src/migration/**/*.ts"
    ],
    subscribers: [
        "src/subscriber/**/*.ts"
    ]
};

const prodConfig = {
    type: config.dbType,
    host: config.dbHost,
    username: config.dbUserName,
    password: config.dbPassword,
    database: config.dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: config.ormSyncEnabled,
    logging: config.ormLogsEnabled,
    entities: ['./build/entity/*.js'],
    cli: {
        entitiesDir: './api/entities',
    },
    migrations: [
        "./migration/**/*.js"
    ],
    subscribers: [
        "./subscriber/**/*.js"
    ]
};

module.exports = process.env.NODE_ENV === 'production' ? prodConfig : devConfig;