const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/:addyid/edit')
  .get(
    control.modeEdit,
    control.onePerson,
    view.showPersonEditView,
    view.show404
    )
  .put(
    control.editPerson,
    control.editAddress,
    view.handlePersonChange,
    view.show406
    )

app.route('/:id/contacts')
  .get(
    control.modeNewContact,
    control.onePerson,
    control.personAllContacts,
    control.pullTotalGiving,
    control.pullGivingThisYear,
    control.pullAverageGiving,
    control.pullMaxGiving,
    control.pullMinGiving,
    control.zillowAPI,
    view.personProfile,
    view.show404
    )

app.route('/:id/notes')
  .get(
    control.modeNewNote,
    control.onePerson,
    control.personAllNotes,
    control.pullTotalGiving,
    control.pullGivingThisYear,
    control.pullAverageGiving,
    control.pullMaxGiving,
    control.pullMinGiving,
    control.zillowAPI,
    view.personProfile,
    view.show404
    )

app.route('/:id/gifts')
  .get(
    control.modeNewGift,
    control.onePerson,
    control.personAllMoney,
    control.pullTotalGiving,
    control.pullGivingThisYear,
    control.pullAverageGiving,
    control.pullMaxGiving,
    control.pullMinGiving,
    control.zillowAPI,
    view.personProfile,
    view.show404
    )

app.route('/new')
  .get(
    view.showPersonNewView,
    view.show404
    )
  .post(
    control.makePerson,
    control.makeAddress,
    view.handlePersonChange,
    view.show406
    )

app.route('/:id')
  .get(
    control.onePerson,
    control.pullTotalGiving,
    control.pullGivingThisYear,
    control.pullAverageGiving,
    control.pullMaxGiving,
    control.pullMinGiving,
    control.zillowAPI,
    view.personProfile,
    view.show404
    )

module.exports = app;
