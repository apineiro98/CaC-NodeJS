//! Express
const express = require('express');

const router = express.Router();

//! Express-Validator
const { body } = require('express-validator');

const rolesValidations = [
  body('name').notEmpty().withMessage('El nombre del Rol es obligatorio.')
];

//! Controllers
const controller = require('../controllers/rolesController');

//! Routers - Create and Store
router.get('/create', controller.create);
router.post('/', rolesValidations, controller.store);

//! Edit
router.get('/edit/:id', controller.edit);
router.put('/', rolesValidations, controller.update);

router.get('/', controller.index);
router.get('/:id', controller.show);

router.delete('/:id', controller.destroy);

//! Exports
module.exports = router;