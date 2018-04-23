DROP DATABASE crm_unit02;
CREATE DATABASE crm_unit02;

\c crm_unit02

DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS contact CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS gifts CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS fundraisers CASCADE;

CREATE TABLE people (
id SERIAL PRIMARY KEY,
prefix TEXT DEFAULT '',
fname TEXT DEFAULT '',
nickname TEXT DEFAULT '',
mname TEXT DEFAULT '',
lname TEXT NOT NULL,
suffix TEXT DEFAULT '',
mailuntil DATE,
occupation VARCHAR(255),
onlyannualreceipt BOOLEAN DEFAULT false,
mailothermonth BOOLEAN DEFAULT false,
mailquarterly BOOLEAN DEFAULT false,
mailtwiceannual BOOLEAN DEFAULT false,
mailonceannual BOOLEAN DEFAULT false,
donotshare BOOLEAN DEFAULT false,
active BOOLEAN DEFAULT true
);

CREATE TABLE campaigns (
id SERIAL PRIMARY KEY,
campaignname TEXT,
type TEXT,
startdate DATE,
enddate DATE,
budgetcategory TEXT,
numofmailers INTEGER,
cost FLOAT(2)
);

CREATE TABLE fundraisers (
id SERIAL PRIMARY KEY,
fname TEXT,
lname TEXT,
goal FLOAT(2)
);

-- CREATE TABLE peopleaddress (
-- contactid INTEGER REFERENCES contact(id),
-- addressid INTEGER REFERENCES address(id)
-- );

CREATE TABLE address (
id SERIAL PRIMARY KEY,
personid INTEGER REFERENCES people(id),
address VARCHAR(255) DEFAULT '',
city TEXT DEFAULT '',
state TEXT DEFAULT '',
zipcode VARCHAR(5) DEFAULT '',
plus4 VARCHAR(4),
main BOOLEAN DEFAULT false,
activestart DATE,
activeend DATE,
donotmail BOOLEAN DEFAULT false
);

CREATE TABLE contact (
id SERIAL PRIMARY KEY,
personid INTEGER REFERENCES people(id),
type TEXT,
contact VARCHAR(255),
preferred BOOLEAN DEFAULT false,
donotcontact BOOLEAN DEFAULT false
);

CREATE TABLE gifts (
id SERIAL PRIMARY KEY,
personid INTEGER REFERENCES people(id),
amount FLOAT(2) DEFAULT 0,
closedate DATE NOT NULL,
fundraiserid INTEGER REFERENCES fundraisers(id),
campaignid INTEGER REFERENCES campaigns(id),
donotthank BOOLEAN DEFAULT false,
isrecurring BOOLEAN DEFAULT false,
appenddate DATE NOT NULL DEFAULT NOW(),
datasource TEXT,
acknowledged DATE,
sourceid TEXT,
paymenttype TEXT
);

CREATE TABLE notes (
id SERIAL PRIMARY KEY,
personid INTEGER REFERENCES people(id),
note TEXT,
notedate TIMESTAMP NOT NULL DEFAULT NOW(),
fundraiserid INTEGER REFERENCES fundraisers(id),
giftid INTEGER,
category TEXT,
followup BOOLEAN DEFAULT false
);

INSERT INTO people
(prefix, fname, lname, active)
VALUES
('hello', 'phil', 'yoo', true),
('that', 'kenny', 'isnofun', true),
('mr.', 'andrew', 'craft', true);

INSERT INTO address
(personid, address, city, state, zipcode, main)
VALUES
(1, '123 Main St', 'New York', 'NY', '12345', true),
(2, '456 Design st', 'Astoria', 'NY', '01203', true),
(3, '555 Artist St', 'Brooklyn', 'NY', '33333', true),
(1, '1515 Idlewild Blvd', 'Fredericksburg', 'VA', '22401', false),
(3, '22 Doogie Howser St', 'Yonkers', 'NY', '55555', false);

INSERT INTO fundraisers
(fname, lname)
VALUES
('phil', 'yoo'),
('johnny', 'cash'),
('jimmy', 'valentine');

INSERT INTO campaigns
(campaignname, type, budgetcategory)
VALUES
('iget$$$', 'email', 'PhilsAstonMartin Fund');

INSERT INTO gifts
(personid, amount, closedate, fundraiserid, campaignid, paymenttype)
VALUES
(3, 1000.00, '4/20/2018', 1, 1, 'ACH'),
(3, 100.00, '4/2/2018', 1, 1, 'cash'),
(1, 100.00, '4/12/2018', 1, 1, 'card'),
(2, 700.00, '4/23/2018', 1, 1, 'ACH'),
(3, 1000.00, '4/21/2018', 1, 1, 'ACH'),
(3, 600.00, '4/3/2018', 1, 1, 'ACH'),
(1, 1000.00, '4/4/2018', 1, 1, 'ACH'),
(2, 100.00, '4/9/2018', 1, 1, 'ACH'),
(3, 200.00, '4/29/2018', 1, 1, 'ACH');

INSERT INTO notes
(personid, note, fundraiserid, category, followup)
VALUES
(1, 'what the fuck ever 1', 1, 'meeting', false),
(2, 'what the fuck ever 2', 1, 'meeting', true),
(3, 'what the fuck ever8', 1, 'meeting', false),
(3, 'what the fuck ever3', 1, 'meeting', false),
(1, 'what the fuck ever9', 1, 'meeting', true),
(2, 'what the fuck ever7', 1, 'meeting', false),
(2, 'what the fuck ever6', 1, 'meeting', false),
(1, 'what the fuck ever5', 1, 'meeting', true);

INSERT INTO contact
(personid, type, contact, preferred)
VALUES
(1, 'email', 'q@q.com', true),
(2, 'email', '1@q.com', true),
(3, 'email', 'b@q.com', true),
(1, 'phone', '123-445-4566', true),
(2, 'phone', '555-555-5555', true),
(1, 'email', 't@q.com', false),
(3, 'email', 'z@q.com', false);

-- \copy people
-- (id, prefix, fname, mname, lname, suffix, mailuntil, occupation,
-- onlyannualreceipt, mailothermonth, mailquarterly, mailtwiceannual,
-- mailonceannual, donotshare, active)
-- FROM './people.csv' DELIMITER ',';

-- \copy address
-- (personid, address, city, state, zipcode, plus4,
-- main, activestart, activeend, donotmail)
-- FROM './address.csv' DELIMITER ',';

-- \copy address
-- (personid, type, contact, preferred, donotcontact)
-- FROM './address.csv' DELIMITER ',';




























