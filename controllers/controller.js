const model = require('../models/model');

module.exports = {
  searchPeople(req, res, next) {
    model.findPeople(req.body)
      .then( (data) => {
        res.json(data);
      })
  }
}
