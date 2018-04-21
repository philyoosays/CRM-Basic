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
    model.findOnePerson(parseInt(req.params.id))
      .then( (data) => {
        res.locals.contact = data;
        res.locals.data= [];
        next();
      })
      .catch( (err) => {
        next(err);
      });
  },

  personAllMoney(req, res, next) {
    model.findGiftsByPerson(parseInt(req.params.id))
      .then( (data) => {
        res.locals.data = data;
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  personAllNotes(req, res, next) {
    model.findNotesByPerson(parseInt(req.params.id))
      .then( (data) => {
        res.locals.data = data;
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  listFundraisers(req, res, next) {
    model.findAllFundraisers()
      .then( (data) => {
        res.locals.fundraiser = data;
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  showOneNote(req, res, next) {
    model.findOneNote(req.params.id)
      .then( (data) => {
        res.locals.
      })
  }

  destroyOneNote(req, res, next) {
    model.destroyNote(parseInt(req.params.id))
      .then( (data) => {
        res.locals.redirect = data.personid;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  }
}
