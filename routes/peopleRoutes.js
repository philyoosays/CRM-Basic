const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/notes')
  .get(control.onePerson, control.personAllNotes, view.personProfile, view.show404)

app.route('/:id/gifts')
  .get(control.onePerson, control.personAllMoney, view.personProfile, view.show404)

app.route('/:id')
  .get(control.onePerson, view.personProfile, view.show404)
  // .get(view.tester)

module.exports = app;
