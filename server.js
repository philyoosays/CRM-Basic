require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session')
const methodOverride = require('method-override')

const searchRoutes = require('./routes/searchRoutes');
const peopleRoutes = require('./routes/peopleRoutes');
const noteRoutes = require('./routes/noteRoutes');
const contactRoutes = require('./routes/contactRoutes');
const giftRoutes = require('./routes/giftRoutes');
// const authService = require('./auth/authService');
// const authRouter = require('./auth/authRouter');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('superSecret', process.env.SECRET);
app.set('view engine', 'ejs');

app.use(session({
  secret: app.get('superSecret'),
  resave: false,
  saveUninitialized: false,
}));

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.redirect('/search')
});

app.use('/search', searchRoutes);
app.use('/people', peopleRoutes);
app.use('/notes', noteRoutes);
app.use('/contacts', contactRoutes);
app.use('/gifts', giftRoutes)
// app.use('/auth', authRouter)

app.listen(PORT, () => {
  console.log(`Server up and listening on port ${PORT}, in ${app.get('env')} mode.`);
});
