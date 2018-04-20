const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id')
  .get(control.onePerson, view.personProfile, view.show404)

module.exports = app;
