//!
const { validationResult } = require('express-validator');
const service = require('../services/usersServices');

const index = async (req, res) => {
  const rows = await service.findAll();
  res.render('users/users_index', { rows });
};

const show = async (req, res) => {
  const rows = await service.findId(req.params);
  res.send(rows);
};

const create = (req, res) => {
  res.render('users/create', { values: {}});
}

const store = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    // console.log(errors);
    return res.render('users/create', {
      values: req.body, 
      error: errors.array(),
      //'values' se usa en el input del form en create.ejs. Guarda los datos ingresados y los vuelve a mostrar en caso de que se recargue la pagina.
    });
  }

  await service.store(req.body, req.file);
  res.redirect('/users');
};

module.exports = {
  index,
  show,
  create,
  store,
}