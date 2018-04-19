const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/results')
  .get(control.findPeople, view.search, view.show404)

app.route('/')
  .get(control.findPeople, view.search, view.show404)

module.exports = app;
