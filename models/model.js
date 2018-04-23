const db = require('../config/connection');

module.exports = {
  createPerson(data) {
    return db.one(`
      INSERT INTO people (
        prefix, fname, nickname, mname, lname, suffix,
        onlyannualreceipt, active
      )
      VALUES (
        $/prefix/,
        $/fname/,
        $/nickname/,
        $/mname/,
        $/lname/,
        $/suffix/,
        $/onlyannualreceipt/,
        $/active/
      )
      RETURNING id
      `, data);
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
        $/main/
      )
      `, data);
  },

  createContact(data) {
    return db.none(`
      INSERT INTO contact (
        personid, type, contact, preferred, donotcontact
      )
      VALUES (
        $/personid/,
        $/type/,
        $/contact/,
        $/preferred/,
        $/donotcontact/
      )
      `, data);
  },

  updatePerson(data) {
    return db.one(`
      UPDATE people
      SET
        prefix = $/prefix/,
        fname = $/fname/,
        mname = $/mname/,
        lname = $/lname/,
        suffix = $/suffix/,
        onlyannualreceipt = $/onlyannualreceipt/,
        active = $/active/
      WHERE
        id = $/personid/
      RETURNING id
      `, data);
  },

  updateAddress(data) {
    return db.none(`
      UPDATE address
      SET
        personid = $/personid/,
        address = $/address/,
        city = $/city/,
        state = $/state/,
        zipcode = $/zipcode/,
        main = $/main/
      WHERE
        id = $/addressid/
      `, data);
  },

  updateContact(data) {
    return db.one(`
      UPDATE contact
      SET
        type = $/type/,
        contact = $/contact/,
        preferred = $/preferred/,
        donotcontact = $/donotcontact/
      WHERE
        id = $/contactid/
      RETURNING *
      `, data);
  },

  destroyContact(id) {
    return db.one(`
      DELETE FROM contact
      WHERE id = $1
      RETURNING personid
      `, id);
  },

  createGift(data) {
    return db.one(`
      INSERT INTO gifts (
        personid, amount, closedate, fundraiserid, campaignid,
        donotthank, isrecurring, datasource,
        acknowledged, sourceid, paymenttype
      )
      VALUES (
        $/personid/,
        $/amount/,
        $/closedate/,
        $/fundraiserid/,
        $/campaignid/,
        $/donotthank/,
        $/isrecurring/,
        $/datasource/,
        $/acknowledged/,
        $/sourceid/,
        $/paymenttype/
      ) RETURNING *
      `, data)
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
      `, data)
  },

  createNote(data) {
    return db.none(`
      INSERT INTO notes (
        personid, note, fundraiserid,
        category, followup, notedate
      )
      VALUES (
        $/personid/,
        $/note/,
        $/fundraiserid/,
        $/category/,
        $/followup/,
        $/notedate/
      )
      `, data);
  },

  updateNote(data) {
    return db.one(`
      UPDATE notes
      SET
        note = $/note/,
        notedate = $/notedate/,
        fundraiserid = $/fundraiserid/,
        category = $/category/,
        followup = $/followup/
      WHERE
        id = $/noteid/
      RETURNING *
      `, data);
  },

  destroyNote(id) {
    return db.one(`
      DELETE FROM notes
      WHERE id = $1
      RETURNING personid
      `, id);
  },

  findPeople(data) {
    console.log('this is the findPeople model')
    return db.any(`
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
        p.active = true
        AND a.main = true
        AND (p.prefix ILIKE $/prefix/)
        AND (p.fname ILIKE $/fname/)
        AND (p.mname ILIKE $/mname/)
        AND (p.lname ILIKE $/lname/)
        AND (p.suffix ILIKE $/suffix/)
        AND (a.address ILIKE $/address/)
        AND (a.city ILIKE $/city/)
        AND (a.state ILIKE $/state/)
        AND (a.zipcode = $/zipcode/)
      `, data);
  },

  findPeopleNoZip(data) {
    console.log('this is the findPeopleNoZip model')
    return db.any(`
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
        p.active = true
        AND a.main = true
        AND (p.prefix ILIKE $/prefix/)
        AND (p.fname ILIKE $/fname/)
        AND (p.mname ILIKE $/mname/)
        AND (p.lname ILIKE $/lname/)
        AND (p.suffix ILIKE $/suffix/)
        AND (a.address ILIKE $/address/)
        AND (a.city ILIKE $/city/)
        AND (a.state ILIKE $/state/)
      `, data);
  },

  findOnePerson(id) {
    return db.one(`
      SELECT people.*,
        address.id AS addressid,
        address.address,
        address.city,
        address.state,
        address.zipcode,
        address.main
      FROM people JOIN address
      ON people.id = address.personid
      WHERE
        people.id = $1
        AND people.active = true
        AND address.main = true
      `, id);
  },

  findGiftsByPerson(id) {
    return db.any(`
      SELECT
        g.*,
        c.campaignname AS campaign,
        f.fname AS firstname,
        f.lname AS lastname
      FROM gifts AS g JOIN campaigns AS c
        ON g.campaignid = c.id
      JOIN fundraisers AS f
        ON g.fundraiserid = f.id
      WHERE g.personid = $1
      ORDER BY closedate DESC
      `, id);
  },

  findNotesByPerson(id) {
    return db.any(`
      SELECT
        n.*,
        f.fname AS firstname, f.lname AS lastname
      FROM notes AS n JOIN fundraisers AS f
        ON n.fundraiserid = f.id
      WHERE n.personid = $1
      ORDER BY n.notedate DESC
      `, id);
  },

  findContactsByPerson(id) {
    return db.any(`
      SELECT * FROM contact
      WHERE personid = $1
      ORDER BY preferred DESC
      `, id);
  },

  findAllFundraisers() {
    return db.many(`
      SELECT * FROM fundraisers
      `);
  },

  findOneNote(id) {
    return db.one(`
      SELECT * FROM notes
      WHERE id = $1
      `, id);
  },

  findAllNoteCategories() {
    return db.any(`
      SELECT category
      FROM notes
      GROUP BY category
      `);
  },

  findAllContactTypes() {
    return db.any(`
      SELECT type
      FROM contact
      GROUP BY type
      `);
  },

  findOneContact(id) {
    return db.one(`
      SELECT * FROM contact
      WHERE id = $1
      `, id);
  },

  listAllCampaigns() {
    return db.many(`
      SELECT campaignname, id
      FROM campaigns
      ORDER BY startdate DESC
      `);
  },

  listAllPaymentTypes() {
    return db.many(`
      SELECT paymenttype
      FROM gifts
      GROUP BY paymenttype
      `)
  },

  updateFundraiser(data) {
    return db.one(`
      UPDATE fundraisers
      SET
        password_digest = $/pwdHash/
      WHERE
        id = $/fundraiserid/
      RETURNING *
      `, data);
  }

};












