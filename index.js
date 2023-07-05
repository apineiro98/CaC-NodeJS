//! Variables de entorno.
require('dotenv').config();

//! Express.
const express = require('express');
const app = express();

//! Cookies-Session
const session = require('cookie-session');

app.use(
  session({
    keys: ['S3cr3t01', 'S3cr3t02'],
  })
);

//!
const expressLayouts = require('express-ejs-layouts');

//! Motor de vistas Ejs.
app.set('view engine', 'ejs');
app.set('views', './src/views');

//! Express Layouts
app.use(expressLayouts);
app.set('layout', './layouts/public');

//!
app.use(express.static('public'));

//!
app.use(express.urlencoded({ extended: true })); 

//! Middleware
const isLogin = (req, res, next) => {
  //Si el dato es falso retorno un true con !req para obligar el login.
  if(!req.session.user_id) {
    return res.redirect('/login');
  }

  next();
};


//! First: req Second: res.
app.get('/', (req, res) => {
  res.render('index');
});


//! Routes
//Users
app.use('/users', isLogin, require('./src/routes/usersRouter'));
//login
app.use('/', require('./src/routes/authRouter'));



//!
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));