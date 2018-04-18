const db = require('../config/connection');

module.exports = {
  findThem(data) {
    return db.many(`
      SELECT
        p.id,
        p.prefix,
        p.fname,
        p.nickname,
        p.mname,
        p.lname,
        p.suffix,
        a.address,
        a.city,
        a.state,
        a.zipcode,
        a.plus4
      FROM people AS p JOIN address AS a
      ON p.id = a.personid
      WHERE
        p.active = true, a.main = true,
        p.fname LIKE '%data.fname%',
        p.lname LIKE '%data.lname%',
        a.address LIKE '%data.address%',
        a.state LIKE '%data.state%',
        a.zipcode LIKE '%data.zipcode%'
      `, {data});
  },

  findOne(id) {
    return db.one(`
      SELECT people.*, address.*
      FROM people JOIN address
      ON people.id = address.personid
      WHERE
        people.id = $1,
        person.active = true,
        address.main = true
      `, id);
  },

  createPerson(data) {
    return db.one(`
      INSERT INTO people (
        prefix, fname, nickname, mname, lname, suffix,
        mailuntil, occupation, onlyannualreceipt,
        mailothermonth, mailquarterly, mailtwiceannual,
        mailonceannual, donotshare
      )
      VALUES (
        $/prefix/,
        $/fname/,
        $/nickname/,
        $/mname/,
        $/lname/,
        $/suffix/,
        $/mailuntil/,
        $/occupation/,
        $/onlyannualreceipt/,
        $/mailothermonth/,
        $/mailquarterly/,
        $/mailtwiceannual/,
        $/mailonceannual/,
        $/donotshare/
      )
      RETURNING id
      `);
  },

  createAddress(data) {
    return db.none(`
      INSERT INTO address (
        personid, address, city, state, zipcode,
        plus4, main, activestart, activeend, donotmail
      )
      VALUES (
        $/id/,
        $/address/,
        $/city/,
        $/state/,
        $/zipcode/,
        $/plus4/,
        $/main/,
        $/activestart/,
        $/activeend/,
        $/donotmail/
      )
      RETURNING id
      `);
  },

  createContact(data) {
    return db.none(`
      WITH thePerson AS (
        INSERT INTO people (
          personid, type, contact, preferred, donotcontact
        )
        VALUES (
          $/id/,
          $/type/,
          $/contact/,
          $/preferred/,
          $/donotcontact/
        )
        RETURNING id
      `);
  },

  updatePerson(data) {
    return db.one(`
      UPDATE people
      SET
        prefix = $/prefix/,
        fname = $/fname/,
        nickname = $/nickname/,
        mname = $/mname/,
        lname = $/lname/,
        suffix = $/suffix/,
        mailuntil = $/mailuntil/,
        occupation = $/occupation/,
        onlyannualreceipt = $/onlyannualreceipt/,
        mailothermonth = $/mailothermonth/,
        mailquarterly = $/mailquarterly/,
        mailtwiceannual = $/mailtwiceannual/,
        mailonceannual = $/mailonceannual/,
        donotshare = $/donotshare/,
        active = $/active/
      WHERE
        id = $/id/
      `, {data});
  },

  updateAddress(data) {
    return db.none(`
      UPDATE address
      SET
        personid = $/id/,
        address = $/address/,
        city = $/city/,
        state = $/state/,
        zipcode = $/zipcode/,
        plus4 = $/plus4/,
        main = $/main/,
        activestart = $/activestart/,
        donotmail = $/donotmail/
      WHERE
        id = $/addressid/
      `, {data});
  },
};












