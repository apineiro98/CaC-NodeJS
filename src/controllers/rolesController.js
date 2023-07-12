//!
const { validationResult } = require('express-validator');
const service = require('../services/rolesServices');

const index = async (req, res) => {
  const rows = await service.findAll();
  res.render('roles/roles_index', { rows });
};

const show = async (req, res) => {
  const rows = await service.findId(req.params);
  res.send(rows);
};

const create = (req, res) => {
  res.render('roles/create', { values: {}});
}

const store = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    // console.log(errors);
    return res.render('roles/create', {
      values: req.body, 
      error: errors.array(),
      //'values' se usa en el input del form en create.ejs. Guarda los datos ingresados y los vuelve a mostrar en caso de que se recargue la pagina.
    });
  }

  await service.store(req.body, req.file);
  res.redirect('/roles');
};

const edit = async (req, res) => {
  const row = await service.findId(req.params);
  res.render('roles/edit', { values: row })
};

const update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.render('/roles/edit', {
      values: req.body,
      errors: errors.array(),
    });
  }

  await service.update(req.body);

  res.redirect('/roles');
};
 
const destroy = async (req, res) => {
  await service.destroy(req.params);
  res.redirect('/roles');
}


module.exports = {
  index,
  show,
  create,
  store,
  edit,
  update,
  destroy,
}