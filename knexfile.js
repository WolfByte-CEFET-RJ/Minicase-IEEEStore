const { configDotenv } = require("dotenv");
configDotenv();
const knex = require('knex')({
    client: 'mysql',
    connection: {
      host: process.env.KNEX_HOST,
      port: process.env.KNEX_PORT,
      user: process.env.KNEX_USERNAME,
      password: process.env.KNEX_PASSWORD,
      database: process.env.KNEX_DATABASE,
    },
  });
  