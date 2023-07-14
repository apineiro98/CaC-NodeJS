const express = require('express');
const router = express.Router();

const { body } = require("express-validator");

const registerValidations = [
  body("email")
    .isEmail()
    .withMessage("Ingrese una dirección de correo electrónico válida")
    .bail()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        // console.log(value, req.body);
        sql = "SELECT * FROM users WHERE email = ?";
        wheres = [value];

        conn.query(sql, wheres).then((row) => {
          // console.log(row, row[0].length);
          if (row[0].length != 0) {
            return reject();
          }
          return resolve();
        });
      });
    })
    .withMessage("Dirección de correo electrónico duplicada"),
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("La contraseña debe tener ...")
    .bail() //! Si valida true lo anterior, recien ahi valida los siguiente.
    .custom((value, { req }) => value === req.body.password_confirmation)
    .withMessage("Las contraseñas no coinciden"),
];

const forgotValidations = [
  body("email")
    .isEmail()
    .withMessage("Ingrese una dirección de correo electrónico válida"),
];

const resetValidations = [
  body("password")
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage("La contraseña debe tener ...")
    .bail()
    .custom((value, { req }) => value === req.body.password_confirmation)
    .withMessage("Las contraseñas no coinciden"),
];

const controller = require('../controllers/authController');

router.get('/register', controller.register);
router.post('/', registerValidations, controller.postRegister); //! register es un middleware valida antes de que se guarde.

router.get('/login', controller.login);
router.post('/login', controller.postLogin);

router.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});


module.exports = router;