const model = require('../models/model');

module.exports = {
  findPeople(req, res, next) {
    res.locals.input = req.query;
    let temp = res.locals.input;
    console.log('atleast this please')
    for(key in temp) {
      temp[key] = '%' + temp[key] + '%';
    }
    if(temp.zipcode !== '%%') {
      temp.zipcode = temp.zipcode.slice(1,-1);
      model.findPeople(req.query)
        .then( (data) => {
          res.locals.result = data;
          for(key in temp) {
            if(key !== 'zipcode'){
              temp[key] = temp[key].slice(1,-1);
            } else if(temp.zipcode === '%%') {
              temp.zipcode = '';
            }
          }
          next();
        })
        .catch( err => {
          next(err);
        });
    } else {
      model.findPeopleNoZip(req.query)
        .then( (data) => {
          res.locals.result = data;
          for(key in temp) {
            if(key !== 'zipcode'){
              temp[key] = temp[key].slice(1,-1);
            } else if(temp.zipcode === '%%') {
              temp.zipcode = '';
            }
          }
          next();
        })
        .catch( err => {
          next(err);
        });
    }
  },

  onePerson(req, res, next) {
    model.findOnePerson(req.params.id)
      .then( (data) => {
        res.locals.contact = data;
        next();
      })
      .catch( (err) => {
        next(err);
      });
  },
}
