// const express = require('express')
// const bcrypt = require('bcrypt');
// const model = require('../models/model');

// module.exports = {
//   getAllUsers(req, res, next) {
//     model.findAllFundraisers()
//       .then( (data) => {
//         res.locals.users = data;
//         next();
//       })
//       .catch( (err) => {
//         next(err)
//       })
//   },
//   async runPasswordGeneration(req, res, next) {

//   async res.locals.users.forEach(d => {
//     let theData = {};
//     theData.pwdHash = await bcrypt.hash(d.username, 11);
//     theData.fundraiserid = d.id;
//     model.updateFundraisers(theData)
//       .then( (data) => {
//         console.log(data)
//       })
//       .catch( (err) => {
//         next(err)
//       })
//   })
// }
