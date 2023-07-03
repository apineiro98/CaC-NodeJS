const service = require('../services/usersServices');


const index = async (req, res) => {
  const rows = await service.findAll();
  res.render('users', { rows });
};

const show = async (req, res) => {
  const rows = await service.findId(req.params);
  res.send(rows);
};

const create = (req, res) => {
  res.render('users/create');
}

const store = async (req, res) => {
  const result = await service.store(req.body, req.file);
  // res.send(result);
   res.redirect('/users');
};



module.exports = {
  index,
  show,
  store,
  create,
}