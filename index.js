//! Variables de entorno.
require('dotenv').config();

//! Express.
const express = require('express');
const app = express();


app.use(express.static('public'));
//! Middleware para recibir el objeto de un formulario.
app.use(express.urlencoded({ extended: true })); 

const expressLayouts = require('express-ejs-layouts');

//! Motor de vistas Ejs.
app.set('view engine', 'ejs');
app.set('views', './src/views');

//! Express Layouts
app.use(expressLayouts);
app.set('layout', './layouts/public');

//! First: req Second: res.
app.get('/', (req, res) => {
  res.render('index');
});

app.use('/users', require('./src/routes/usersRouter'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));