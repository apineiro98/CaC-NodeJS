//!
const { validationResult } = require('express-validator');
const service = require('../services/userServices');

const index = async (req, res) => {
  const rows = await service.findAll();
  res.render(rows);
};

const show = async (req, res) => {
  const rows = await service.findId(req.params);
  res.send(rows);
};

// const create = (req, res) => {
//   res.render('users/create', { values: {}});
// }

const store = async (req, res) => {
  // const errors = validationResult(req.body);
  // if(!errors.isEmpty()) {
  //   // console.log(errors);
  //   return res.render('users/create', {
  //     values: req.body, 
  //     error: errors.array(),
  //     //'values' se usa en el input del form en create.ejs. Guarda los datos ingresados y los vuelve a mostrar en caso de que se recargue la pagina.
  //   });
  // }

  // await service.store(req.body, req.file);
  // res.redirect('/users');
  const result = await service.store(req.body);
  res.send(result);

};

module.exports = {
  index,
  show,
  store,
}