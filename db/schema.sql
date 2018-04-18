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
prefix TEXT,
fname TEXT,
nickname TEXT,
mname TEXT,
lname TEXT NOT NULL,
suffix TEXT,
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
address VARCHAR(255),
city TEXT,
state TEXT,
zipcode INTEGER,
plus4 INTEGER,
main BOOLEAN,
activestart DATE,
activeend DATE,
donotmail BOOLEAN
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
amount FLOAT(2),
closedate DATE,
fundraiserid INTEGER REFERENCES fundraisers(id),
campaignid INTEGER REFERENCES campaigns(id),
donotthank BOOLEAN,
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
notedate DATE,
fundraiserid INTEGER REFERENCES fundraisers(id),
giftid INTEGER REFERENCES gifts(id),
category TEXT,
followup BOOLEAN
);































