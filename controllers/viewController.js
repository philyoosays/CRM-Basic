module.exports = {

  show404(err, req, res, next) {
    console.log('show404 triggered')
    console.log(err)
    res.sendStatus(404);
  },

  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  search(req, res, next) {
    res.render('mainSearch.ejs')
  },
  searchResults(req, res, next) {
    res.render('searchResults.ejs',
      {
        input: res.locals.input,
        result: res.locals.result,
      })
  },
  showNoteEditView(req, res, next) {
    res.render('noteEdit.ejs',
      {
        fundraiser: res.locals.fundraiser,
        contact: res.locals.contact,
        data: res.locals.data,
        category: res.locals.category,
        mode: res.locals.mode,
      })
  },
  showNoteNewView(req, res, next) {
    res.render('noteNew.ejs',
      {
        contact: res.locals.contact,
        fundraiser: res.locals.fundraiser,
        category: res.locals.category,
        mode: res.locals.mode,
      })
  },
  showContactEditView(req, res, next) {
    res.render('contactEdit.ejs',
      {
        contact: res.locals.contact,
        data: res.locals.data,
        type: res.locals.type,
        mode: res.locals.mode,
      })
  },
  showContactNewView(req, res, next) {
    res.render('contactNew.ejs',
      {
        contact: res.locals.contact,
        type: res.locals.type,
        mode: res.locals.mode,
      })
  },
  showGiftNewView(req, res, next) {
    res.render('giftNew.ejs',
      {
        contact: res.locals.contact,
        fundraiser: res.locals.fundraiser,
        campaigns: res.locals.campaigns,
        paymenttypes: res.locals.paymenttypes,
        mode: res.locals.mode,
      })
  },
  showPersonEditView(req, res, next) {
    res.render('personEdit.ejs',
    {
      contact: res.locals.contact,
    })
  },
  showPersonNewView(req, res, next) {
    res.render('personNew.ejs')
  },
  personProfile(req, res, next) {
    res.render('oneperson.ejs',
      {
        contact: res.locals.contact,
        money: res.locals.money,
        data: res.locals.data,
        mode: res.locals.mode,
        valuation: res.locals.valuation,
        stats: res.locals.stats,
      })
  },
  handleNoteChange(req, res, next) {
    res.redirect('/people/' + res.locals.redirect + '/notes');
  },
  handleContactChange(req, res, next) {
    res.redirect('/people/' + res.locals.redirect + '/contacts');
  },
  handleGiftChange(req, res, next) {
    res.redirect('/people/' + res.locals.redirect + '/gifts');
  },
  handlePersonChange(req, res, next) {
    res.redirect('/people/' + res.locals.tempdata.personid);
  },
  showLoginForm(req, res, next) {
    res.render('login.ejs')
  }
}























