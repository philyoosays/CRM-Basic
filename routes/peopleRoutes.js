const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id')
  .get()

module.exports = app;
