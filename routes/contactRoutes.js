const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/edit')
  .get(
    control.modeNewContact,
    control.getAllContactTypes,
    control.showOneContact,
    control.onePersonEditView,
    view.showContactEditView,
    view.show404
    )
  .put(
    control.changeOneContact,
    view.handleContactChange,
    view.show406
    )

app.route('/:id/new')
  .get(
    control.modeNewContact,
    control.getAllContactTypes,
    control.onePerson,
    view.showContactNewView,
    view.show404
    )
  .post(
    control.addNewContact,
    view.handleContactChange,
    view.show406
    )

app.route('/:id')
  .delete(
    control.destroyOneContact,
    view.handleContactChange,
    view.show404
    )

module.exports = app;
