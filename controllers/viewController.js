module.exports = {

  tester(req, res, next) {
    res.send('this works');
  },
  show404(err, req, res, next) {
    console.log('show404 triggered')
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  search(req, res, next) {
    res.render('mainSearch.ejs')
  },
  searchResults(req, res, next) {
    res.render('searchResults.ejs', {input: res.locals.input, result: res.locals.result})
    // res.json(res.locals.result)
  },
  personProfile(req, res, next) {
    res.render('oneperson.ejs', {contact: res.locals.contact, money: res.locals.money, data: res.locals.data})
  },
  handleNoteDelete(req, res, next) {
    res.redirect('/people/' + res.locals.redirect + '/notes')
  }
  // handleCreate(req, res) {
  //   res.redirect('search/results');
  // },
  // handleEdit(req, res) {
  //   res.render('students/edit.ejs', {student: res.locals.student, houses: res.locals.houses});
  // }
}
