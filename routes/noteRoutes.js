const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/edit')
  .get(control.listFundraisers, view.searchResults, view.show404)
  .put()

app.route('/:id')
  .delete(control.destroyOneNote, view.handleNoteDelete, view.show404)

module.exports = app;
