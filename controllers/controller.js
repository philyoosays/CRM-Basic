const model = require('../models/model');

module.exports = {
  findPeople(req, res, next) {
    console.log(req.params)
    console.log(req.body)
    if(Object.keys(req.body).length > 0){
      console.log('yoyoyo')
      res.locals.input = req.body;
      model.findPeople(req.body)
        .then( (data) => {
          res.locals.result = data;
          next()
        })
        .catch( err => {
          next(err);
        });
    } else {
      console.log('else statement')
      next()
    }
  }
}
