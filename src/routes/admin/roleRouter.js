//! Express
const express = require('express');
const router = express.Router();

//! BD
const { conn } = require("../../config/db");

//! Express-Validator
const { body } = require('express-validator');

const rolesValidations = [
  body("name")
    .notEmpty()
    .withMessage("El campo es obligatorio")
    .bail()
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        sql = "SELECT * FROM roles WHERE name LIKE ?";
        wheres = [value];

        if (req.body.id) {
          sql += " AND id != ?";
          wheres.push(req.body.id);
        }

        conn.query(sql, wheres).then((row) => {
          if (row[0].length != 0) {
            return reject();
          }
          return resolve();
        });
      });
    })
    .withMessage("Registro duplicado"),
];

//! Controllers
const controller = require('../../controllers/admin/roleController');

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