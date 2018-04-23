const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/contacts')
  .get(
    control.modeNewContact,
    control.onePerson,
    control.personAllContacts,
    view.personProfile,
    view.show404
    )

app.route('/:id/notes')
  .get(
    control.modeNewNote,
    control.onePerson,
    control.personAllNotes,
    view.personProfile,
    view.show404
    )

app.route('/:id/gifts')
  .get(
    control.modeNewGift,
    control.onePerson,
    control.personAllMoney,
    view.personProfile,
    view.show404
    )

app.route('/:id/new')

app.route('/:id/edit')
  .get()

app.route('/:id')
  .get(
    control.onePerson,
    view.personProfile,
    view.show404
    )

module.exports = app;
