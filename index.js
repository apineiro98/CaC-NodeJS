//! Variables de entorno.
require('dotenv').config();

//! Express.
const express = require('express');
const app = express();

//! Middleware para recibir el objeto de un formulario.
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); 

//! Motor de vistas Ejs.
app.set('view engine', 'ejs');
app.set('views', './src/views');


//! First: req Second: res.
app.get('/', (req, res) => {
  res.render('index', {text: 'Hola EJS'});
});

app.use('/users', require('./src/routes/usersRouter'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));