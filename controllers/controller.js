require('dotenv').config();
const parseString = require('xml2js').parseString;
const express = require('express');
const http = require('http')

const model = require('../models/model');

const app = express();
app.set('apiKey', process.env.APIKEY)

module.exports = {

  ///////////////////////////////////
  // LISTS //////////////////////////
  ///////////////////////////////////

  findPeople(req, res, next) {
    res.locals.input = req.query;
    let theData = res.locals.input;

    // Stopping blank searches
    let concatString = '';
    for(keys in theData) {
      concatString += theData[keys];
    }
    if(concatString === '') {
      res.locals.result = [];
      next();
    } else {
      // Adding wildcards
      for(key in theData) {
        theData[key] = '%' + theData[key] + '%';
      }
      // zipcode HAS a value
      if(theData.zipcode !== '%%') {
        theData.zipcode = theData.zipcode.slice(1,-1);
        model.findPeople(req.query)
          .then( (data) => {
            res.locals.result = data;
            for(key in theData) {
              if(key !== 'zipcode'){
                theData[key] = theData[key].slice(1,-1);
              } else if(theData.zipcode === '%%') {
                theData.zipcode = '';
              }
            }
            next();
          })
          .catch( err => {
            next(err);
          });
      } else {
        // zipcode did NOT HAVE a value
        model.findPeopleNoZip(req.query)
          .then( (data) => {
            res.locals.result = data;
            for(key in theData) {
              if(key !== 'zipcode'){
                theData[key] = theData[key].slice(1,-1);
              } else if(theData.zipcode === '%%') {
                theData.zipcode = '';
              }
            }
            next();
          })
          .catch( err => {
            next(err);
          });
      }
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
    req.body.personid = parseInt(req.params.id);
    req.body.fundraiserid = parseInt(req.body.fundraiserid);
    req.body.campaignid = parseInt(req.body.campaignid);
    req.body.amount = parseFloat(req.body.amount);
    res.locals.redirect = req.body.personid;
    if(req.body.acknowledged === '') {
      req.body.acknowledged = null;
    }
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

  editPerson(req, res, next) {
    req.body.personid = parseInt(req.params.id);
    req.body.addressid = parseInt(req.params.addyid);
    res.locals.tempdata = req.body;
    console.log('all the data: ', res.locals.tempdata)
    model.updatePerson(req.body)
      .then( (data) => {
        console.log('moving onto address')
        next();
      })
      .catch( (err) => {
        next(err);
      })
  },

  editAddress(req, res, next) {
    console.log('editaddress: ', res.locals.tempdata)
    model.updateAddress(res.locals.tempdata)
      .then( (data) => {
        console.log('edit address ran')
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  makePerson(req, res, next) {
    res.locals.data = req.body
    console.log(res.locals.data)
    model.createPerson(req.body)
      .then( (data) => {
        res.locals.tempdata = data
        next()
      })
      .catch( (err) => {
        next(err);
      })
  },

  makeAddress(req, res, next) {
    model.createAddress(res.locals.tempdata, res.locals.data)
      .then( (data) => {
        res.locals.tempdata.personid = res.locals.tempdata.id
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

  modeEdit(req, res, next) {
    res.locals.mode = 'edit';
    next()
  },

  modeNew(req, res, next) {
    res.locals.mode = 'new'
    next()
  },

  ///////////////////////////////////
  // REPORTING //////////////////////
  ///////////////////////////////////

  pullTotalGiving(req, res, next) {
    model.totalGiving(parseInt(req.params.id))
      .then( (data) => {
        if(data.length === 0 || data[0].sum === null){
          data[0] = { sum: 0 };
        }
        res.locals.stats = {}
        res.locals.stats.totalgiving = data[0].sum.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  pullGivingThisYear(req, res, next) {
    model.totalThisYear(parseInt(req.params.id))
      .then( (data) => {
        if(data.length === 0 || data[0].sum === null){
          data[0] = { sum: 0 };
        }
        res.locals.stats.ytdgiving = data[0].sum.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  pullAverageGiving(req, res, next) {
    model.averageGiving(parseInt(req.params.id))
      .then( (data) => {
        if(data.length === 0 || data[0].avg === null){
          data[0] = { avg: 0 };
        }
        res.locals.stats.avggiving = data[0].avg.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  pullMaxGiving(req, res, next) {
    model.maxGiving(parseInt(req.params.id))
      .then( (data) => {
        if(data.length === 0 || data[0].max === null){
          data[0] = { max: 0 };
        }
        res.locals.stats.maxgiving = data[0].max.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  pullMinGiving(req, res, next) {
    model.minGiving(parseInt(req.params.id))
      .then( (data) => {
        if(data.length === 0 || data[0].min === null){
          data[0] = { min: 0 };
        }
        res.locals.stats.mingiving = data[0].min.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD'
        })
        next()
      })
      .catch( (err) => {
        next(err)
      })
  },

  ///////////////////////////////////
  // API CALL ///////////////////////
  ///////////////////////////////////

  zillowAPI(req, res, next) {
    let address = res.locals.contact.address;
    let city = res.locals.contact.city;
    let state = res.locals.contact.state;
    address = address.split(' ').join('+');
    city = city.split(' ').join('+');
    city = city + '%2C+' + state;

    const url = 'http://www.zillow.com/webservice/GetSearchResults.htm?zws-id=' + app.get('apiKey') + '&address=' + address + '&citystatezip=' + city;

    let apiCall = http.get(url, function (response) {
        let completeResponse = '';
        response.on('data', function (chunk) {
          completeResponse += chunk;
        });
        response.on('end', function() {
          parseString(completeResponse, (err, result) => {
            if(result['SearchResults:searchresults'].message[0].code[0] === '0') {
              res.locals.api = parseInt(result['SearchResults:searchresults'].response[0].results[0].result[0].zestimate[0].amount[0]['_']);
              res.locals.api = res.locals.api.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })
              res.locals.valuation = {};
              res.locals.valuation.low = parseInt(result['SearchResults:searchresults'].response[0].results[0].result[0].zestimate[0].valuationRange[0].low[0]['_']);
              res.locals.valuation.low = res.locals.valuation.low.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })
              res.locals.valuation.high = parseInt(result['SearchResults:searchresults'].response[0].results[0].result[0].zestimate[0].valuationRange[0].high[0]['_']);
              res.locals.valuation.high = res.locals.valuation.high.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD'
              })
            } else {
              res.locals.api = 'no data available';
              res.locals.valuation = {};
              res.locals.valuation.low = 'no data available';
              res.locals.valuation.high = 'no data available';
            }
          })
          next()
        })
    }).on('error', function (err) {
        next(err);
    });
  },

}










