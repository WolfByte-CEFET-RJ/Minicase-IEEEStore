const path = require('path');
require('dotenv').config();
require('dotenv').config({path: '../../.env'});

module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.KNEX_HOST,
    user: process.env.KNEX_USERNAME,
    password: process.env.KNEX_PASSWORD,
    database: process.env.KNEX_DATABASE,
    port: process.env.KNEX_PORT,
  },
  migrations: {
    directory: path.resolve(__dirname, './db/migrations'),
    tableName: 'knex_migrations',
  },
};
