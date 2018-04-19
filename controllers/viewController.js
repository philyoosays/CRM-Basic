module.exports = {

  show404(err, req, res, next) {
    console.log('show404 triggered')
    res.sendStatus(404);
  },
  show406(err, req, res, next) {
    res.sendStatus(406);
  },
  search(req, res, next) {
    res.render('mainSearch.ejs', {input: res.locals.input, result: res.locals.result})
  },
  handleCreate(req, res) {
    res.redirect('/quotes');
  },
  handleEdit(req, res) {
    res.render('students/edit.ejs', {student: res.locals.student, houses: res.locals.houses});
  }
}
