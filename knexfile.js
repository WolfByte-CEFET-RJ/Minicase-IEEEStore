const path = require('path');
require('dotenv').config({path: '../../.env'});

console.log('KNEX_HOST:', process.env.KNEX_HOST);

module.exports = {
  client: 'mysql2',
git commit -m "Mensagem do commit explicando as alterações"
  migrations: {
    directory: path.resolve(__dirname, './src/db/migrations'),
    tableName: 'knex_migrations',
  },
};
