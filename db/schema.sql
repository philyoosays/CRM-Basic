
CREATE DATABASE crm;

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
onlyannualreceipt BOOLEAN,
mailothermonth BOOLEAN,
mailquarterly BOOLEAN,
mailtwiceannual BOOLEAN,
mailonceannual BOOLEAN,
donotshare BOOLEAN,
active BOOLEAN DEFAULT true
);

CREATE TABLE peopleaddress (
contactid INTEGER REFERENCES contact(id),
addressid INTEGER REFERENCES address(id)
)

CREATE TABLE address (
id SERIAL PRIMARY KEY,
address VARCHAR(255),
city TEXT,
state TEXT,
zipcode INTEGER,
plus4 INTEGER,
primary BOOLEAN,
activestart DATE,
activeend DATE,
donotmail BOOLEAN
);

CREATE TABLE contact (
id SERIAL PRIMARY KEY,
contactid INTEGER REFERENCES contact(id),
type TEXT,
contact VARCHAR(255),
perferred BOOLEAN,
donotcontact BOOLEAN
);

CREATE TABLE notes (
id SERIAL PRIMARY KEY,
contactid INTEGER REFERENCES contacts(id),
note TEXT,
notedate DATE,
fundraiserid INTEGER REFERENCES fundraisers(id),
giftid INTEGER REFERENCES gifts(id),
category TEXT,
followup BOOLEAN
);

CREATE TABLE gifts (
id SERIAL PRIMARY KEY,
contactid INTEGER REFERENCES contacts(id),
amount FLOAT(2),
closedate DATE,
fundraiserid INTEGER REFERENCES fundraisers(id),
campaignid INTEGER REFERENCES campaign(id),
donotthank BOOLEAN,
isrecurring BOOLEAN,
appenddate DATE,
datasource TEXT,
acknowledged DATE,
sourceid TEXT,
paymenttype TEXT
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
