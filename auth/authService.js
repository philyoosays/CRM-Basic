const bcrypt = require('bcrypt');
const user = require('../models/model');

module.exports = {
   async login (req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne(username);
      const isValidPass = await bcrypt.compare(password, user.password_digest);
      if (!isValidPass) {
        throw { message: 'bad password'}
      }
      req.session.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },

  logout(req, res, next) {

  },

  loginRequired: [
    (req, res, next) => {
      if(req.session.user.id == req.params.user_id){
        next()
      }
      else {
        console.log('there was an error andrew')
        next('error')
      }
    },
    (err, req, res, next) => {
      res.redirect('/unauthorized')
    }
  ]
};
