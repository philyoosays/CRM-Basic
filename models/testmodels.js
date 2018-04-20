const db = require('../config/connection');

module.exports = {
  findPeople(data) {
  console.log('this is the findPeople model')
  console.log(data)
  return db.many(`
    SELECT *
    FROM people
    WHERE
      prefix = $/prefix/
    `, data);
  },
}
