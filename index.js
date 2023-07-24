//! Variables de entorno.
require('dotenv').config();

//! Express.
const express = require('express');
const app = express();

//! Method-Override
const methodOverride = require('method-override');

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
app.use(methodOverride('_method'));

//! Middleware
const isLogin = (req, res, next) => {
  //Si el dato es falso retorno un true con !req para obligar el login.
  if(!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
};


//! Public
app.get('/', (req, res) => {
  res.render('index');
});

app.use("/profiles", require("./src/routes/profileRouter"));

//! Auth
app.use("/", require("./src/routes/authRouter"));

//! Private
app.get("/admin", isLogin, (req, res) => {
  res.render("admin/index", { layout: "./layouts/private" });
});

app.use("/admin/users", isLogin, require("./src/routes/admin/userRouter"));
app.use("/admin/roles", isLogin, require("./src/routes/admin/roleRouter"));

app.use(
  "/admin/products",
  isLogin,
  require("./src/routes/admin/productRouter")
);

app.use(
  "/admin/categories",
  isLogin,
  require("./src/routes/admin/categoryRouter")
);

//!
const PORT = process.env.PORT || 3000;

//! La forma de iniciarse el servidor en express es asincrona.
//! Por eso se lo ejecuta dentro del callback.
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));