const db = require('../config/connection');

module.exports = {
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
      RETURNING *
      `);
  },

  createAddress(data) {
    return db.one(`
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
      RETURNING *
      `);
  },

  createContact(data) {
    return db.one(`
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
        RETURNING *
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
      RETURNING *
      `, {data});
  },

  updateAddress(data) {
    return db.one(`
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
      RETURNING *
      `, {data});
  },

  updateContact(data) {
    return db.one(`
      UPDATE contact
      SET
        personid = $/id/,
        type = $/type/,
        contact = $/contact/,
        preferred = $/preferred/,
        donotcontact = $/donotcontact/
      WHERE
        id = $/contactid/
      RETURNING *
      `, {data});
  },

  destroyContact(id) {
    return db.none(`
      DELETE FROM contact
      WHERE id = $1
      `, id);
  },

  createGift(data) {
    return db.one(`
      INSERT INTO gifts (
        personid, amount, closedate, fundraiserid, campaignid,
        donotthank, isrecurring, appenddate, datasource,
        acknowledged, sourceid, paymenttype
      )
      VALUES (
        $/id/,
        $/amount/,
        $/closedate/,
        $/fundraiserid/,
        $/campaignid/,
        $/donotthank/,
        $/isrecurring/,
        $/appenddate/,
        $/datasource/,
        $/acknowledged/,
        $/sourceid/,
        $/paymenttype/
      ) RETURNING *
      `, {data})
  },

  updateGift(data) {
    return db.one(`
      UPDATE gifts
      SET
        personid = $/id/,
        amount = $/amount/,
        closedate = $/closedate/,
        fundraiserid = $/fundraiserid/,
        campaignid = $/campaignid/,
        donotthank = $/donotthank/,
        isrecurring = $/isrecurring/,
        appenddate = $/appenddate/,
        datasource = $/datasource/,
        acknowledged = $/acknowledged/,
        sourceid = $/sourceid/,
        paymenttype = $/paymenttype/
      WHERE
        id = $/giftid/
      RETURNING id
      `, {data})
  },

  createNote(data) {
    return db.one(`
      INSERT INTO notes (
        personid, note, fundraiserid, giftid,
        category, followup
      )
      VALUES (
        $/id/,
        $/note/,
        $/fundraiserid/,
        $/giftid/,
        $/category/,
        $/followup/
      ) RETURNING *
      `, {data});
  },

  updateNote(data) {
    return db.one(`
      UPDATE notes
      SET
        note = $/note/,
        fundraiserid = $/fundraiserid/,
        giftid = $/giftid/,
        category = $/category/,
        followup = $/followup/
      WHERE
        id = $/noteid/
      RETURNING *
      `, {data});
  },

  destroyNote(id) {
    return db.none(`
      DELETE FROM notes
      WHERE id = $1
      `, id);
  },

  findPeople(data) {
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

  findOnePerson(id) {
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

  findGiftsByPerson(id) {
    return db.many(`
      SELECT * FROM gifts
      WHERE personid = $1
      `, id);
  },

  findNotesByPerson(id) {
    return db.many(`
      SELECT * FROM notes
      WHERE personid = $1
      `, id);
  },

  findContactsByPerson(id) {
    return db.many(`
      SELECT * FROM contact
      WHERE personid = $1
      `, id);
  }
};












