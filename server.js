// require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session')

const searchRoutes = require('./routes/searchRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// app.set('superSecret', process.env.SECRET);
app.set('view engine', 'ejs');

// app.use(session({
//   secret: app.get('superSecret'),
//   resave: false,
//   saveUninitialized: false,
// }));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.send('<h1>HOMEPAGE</h1>')
});

app.use('/search', searchRoutes);
app.use('/people', peopleRoutes);

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
