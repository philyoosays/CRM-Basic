const express = require('express');
const view = require('../controllers/viewController');
const control = require('../controllers/controller');

const app = express.Router();

app.route('/:id/new')
  .get(
    control.modeNewGift,
    control.listFundraisers,
    control.getAllCampaigns,
    control.showAllPaymentTypes,
    control.onePerson,
    view.showGiftNewView,
    view.show404
    )
  .post(
    control.addNewGift,
    view.handleGiftChange,
    view.show406
    )

module.exports = app;
