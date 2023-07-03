//! Routing refers to determining how an applicaction responds to a client request to a particular endpoint.

//! Express
const express = require('express');

const router = express.Router();

//! Multer
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => cb(null, Date.now() + "_" + file.originalname)
});

const uploadFile = multer({ storage });

//! Express-Validator
// En la ruta require solo el body.
const { body } = require('express-validator');

const validateInput = require('../middlewares/validator');

//! Dentro del array estan todos los elementos con cada una de las validaciones.
// Los .is() son las validaciones. Buscar cuales hay.
const userValidations = [
  body('email') //Valida que dentro del HTML este el atributo name='email'.
    .isEmail()
    .withMessage('Ingresa una direccion de correo valida'),
  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
    .withMessage('La contraseña debe tener ...'),
    // .withMessage('La contraseña debe tener al menos 6 caracteres')
    // .isLength({ min: 6 })
];


//! Controllers
const controller = require('../controllers/usersController');


//! Routers
//Create
router.get('/create', controller.create);

//Store
router.post(
  '/',
  userValidations,
  validateInput,
  uploadFile.single("image"),
  controller.store
);

router.get('/', controller.index);
router.get('/:id', controller.show);

//! Exports
module.exports = router;