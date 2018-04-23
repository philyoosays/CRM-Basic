const convert = require('xml-js');
const model = require('../models/model');

module.exports = {

  ///////////////////////////////////
  // LISTS///////////////////////////
  ///////////////////////////////////

  findPeople(req, res, next) {
    res.locals.input = req.query;
    let temp = res.locals.input;
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

  personAllContacts(req, res, next) {
    model.findContactsByPerson(req.params.id)
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

  findAllNoteCategories(req, res, next) {
    model.findAllNoteCategories()
      .then( (data) => {
        res.locals.category = data;
        next()
      })
      .catch( (err) =>{
        next(err)
      })
  },

  getAllCampaigns(req, res, next) {
    model.listAllCampaigns()
      .then( (data) => {
        res.locals.campaigns = data;
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  getAllContactTypes(req, res, next) {
    model.findAllContactTypes()
      .then( (data) => {
        res.locals.type = data;
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  showAllPaymentTypes(req, res, next) {
    model.listAllPaymentTypes()
      .then( (data) => {
        res.locals.paymenttypes = data;
        next()
      })
  },

  //////////////////////////////////
  // SHOW ONE THING ////////////////
  //////////////////////////////////

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

  onePersonEditView(req, res, next) {
    model.findOnePerson(parseInt(res.locals.data.personid))
      .then( (data) => {
        res.locals.contact = data;
        next();
      })
      .catch( (err) => {
        next(err);
      });
  },

  showOneNote(req, res, next) {
    model.findOneNote(req.params.id)
      .then( (data) => {
        data.notedateinput = data.notedate.getFullYear() + '-' + ("0" + (data.notedate.getMonth() + 1)).slice(-2) + '-' + ("0" + data.notedate.getDate()).slice(-2)
        res.locals.data = data;
        next();
      })
  },

  showOneContact(req, res, next) {
    model.findOneContact(parseInt(req.params.id))
      .then( (data) => {
        res.locals.data = data;
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  /////////////////////////////////
  // DO SOMETHING /////////////////
  /////////////////////////////////

  addNewNote(req, res, next) {
    res.locals.redirect = req.params.id;
    req.body.personid = parseInt(req.params.id);
    req.body.fundraiserid = parseInt(req.body.fundraiserid);
    if(req.body.notedate === '') {
      req.body.notedate = new Date().toJSON();
    }
    model.createNote(req.body)
      .then( (data) => {
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  addNewContact(req, res, next) {
    res.locals.redirect = req.params.id;
    req.body.personid = parseInt(req.params.id);
    model.createContact(req.body)
      .then( (data) => {
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  addNewGift(req, res, next) {
    res.locals.redirect = req.params.id;
    req.body.personid = parseInt(req.params.id);
    model.createGift(req.body)
      .then( (data) => {
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  addNewGift(req, res, next) {
    req.body.personid = parseInt(req.params.id);
    req.body.fundraiserid = parseInt(req.body.fundraiserid);
    req.body.campaignid = parseInt(req.body.campaignid);
    req.body.amount = parseFloat(req.body.amount);
    res.locals.redirect = req.body.personid;
    console.log('addNewGift: ', req.body)
    model.createGift(req.body)
      .then( (data) => {
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  changeOneNote(req, res, next) {
    req.body.noteid = parseInt(req.params.id);
    model.updateNote(req.body)
      .then( (data) => {
        res.locals.redirect = data.personid;
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  changeOneContact(req, res, next) {
    req.body.contactid = parseInt(req.params.id);
    model.updateContact(req.body)
      .then( (data) => {
        res.locals.redirect = data.personid;
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  destroyOneNote(req, res, next) {
    model.destroyNote(parseInt(req.params.id))
      .then( (data) => {
        res.locals.redirect = data.personid;
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  destroyOneContact(req, res, next) {
    model.destroyContact(parseInt(req.params.id))
      .then( (data) => {
        res.locals.redirect = data.personid;
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },



  //////////////////////////////////
  // LABEL MAKERS //////////////////
  //////////////////////////////////

  modeNewContact(req, res, next) {
    res.locals.mode = 'contacts';
    next()
  },

  modeNewGift(req, res, next) {
    res.locals.mode = 'gifts';
    next()
  },

  modeNewNote(req, res, next) {
    res.locals.mode = 'notes';
    next()
  },

  ///////////////////////////////////
  // API CALL ///////////////////////
  ///////////////////////////////////

  zillowAPI(req, res, next) {
    res.locals.address = '2272 Victory Blvd'
    res.locals.city = 'Staten Island'
    res.locals.state = 'NY'
    res.locals.address = res.locals.address.split(' ').join('+');
    res.locals.city = res.locals.city.split(' ').join('+');
    res.locals.city = res.locals.city + '%2C+' + res.locals.state;
    console.log('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1gde99cc557_10irx&address=' + res.locals.address + '&citystatezip=' + res.locals.city)
    fetch('http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=X1-ZWz1gde99cc557_10irx&address=' + res.locals.address + '&citystatezip=' + res.locals.city)
      .then( (data) => {
        // res.locals.jsonData = convert.xml2json(data, { compact: true, spaces: 4 });
        // res.json(res.locals.jsonData)
        res.send(data);
      })
      .catch( (err) => {
        next(err)
      })
  }

}










