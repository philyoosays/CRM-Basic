const pgp = require('pg-promise')();
const config = {
  host: 'localhost',
  port: 5432,
  database: 'crm_unit02'
};
const db = pgp('config');

module.exports = db;
