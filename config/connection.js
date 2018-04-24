require('dotenv').config();
const express = require('express');
const app = express();

app.set('database', process.env.DATABASE)


const pgp = require('pg-promise')({
  query: q => console.log(q.query),
});

const config = {
  host: 'localhost',
  port: 5432,
  database: 'crm_unit02'
  username:
};

const db = pgp(config);

module.exports = db;
