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
perferred BOOLEAN,
donotcontact BOOLEAN
);

CREATE TABLE gifts (
id SERIAL PRIMARY KEY,
personid INTEGER REFERENCES people(id),
amount FLOAT(2) DEFAULT 0,
closedate DATE NOT NULL,
fundraiserid INTEGER REFERENCES fundraisers(id),
campaignid INTEGER REFERENCES campaigns(id),
donotthank BOOLEAN DEFAULT false,
isrecurring BOOLEAN,
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
notedate DATE NOT NULL DEFAULT NOW(),
fundraiserid INTEGER REFERENCES fundraisers(id),
giftid INTEGER REFERENCES gifts(id),
category TEXT,
followup BOOLEAN
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




























