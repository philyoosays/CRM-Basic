const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/edit')
  .get(
    control.modeNewNote,
    control.listFundraisers,
    control.findAllNoteCategories,
    control.showOneNote,
    control.onePersonEditView,
    view.showNoteEditView,
    view.show404
    )
  .put(
    control.changeOneNote,
    view.handleNoteChange,
    view.show406
    )

app.route('/:id/new')
  .get(
    control.modeNewNote,
    control.onePerson,
    control.findAllNoteCategories,
    control.listFundraisers,
    view.showNoteNewView,
    view.show404
    )
  .post(
    control.addNewNote,
    view.handleNoteChange,
    view.show406
    )

app.route('/:id')
  .delete(
    control.destroyOneNote,
    view.handleNoteChange,
    view.show404
    )

module.exports = app;
