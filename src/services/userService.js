const model = require('../models/User');
const bcryptjs = require('bcryptjs');

const findAll = async () => {
  //return model.findAll();
  const rows = await model.findAll();

  if (rows.length > 0) {
    return rows;
  }

  return "No hay registros";
};

const findOne = async (params) => {
  // const rows = await model.findId(params);
  const row = await model.findOne(params);
  if (row.length > 0) {
    return row[0];
  }

  return 'El registro no existe';
  
};

const store = async (body) => {
  //! Llega en texto plano, se encripta y llega al model encriptado.
  //! Params: string y cantidad de encriptados.
  body.password = await bcryptjs.hash(body.password, 8);

  return await model.store(body);
};

const update = async (body) => {
  body.password = await bcryptjs.hash(body.password, 8);

  const result = await model.update(body);

  if (result.affectedRows > 0) {
    return 'Registro actualizado';
  } else if (result.affectedRows == 0) {
    return 'El registro no existe';
  }

  return result;
};

const destroy = async (params) => {
  const result = await model.destroy(params);

  if (result.affectedRows > 0) {
    return 'Registro eliminado';
  }

  return 'El registro no existe';
};

const roles = async (params) => {
  const rows = await model.roles(params);
  return rows;
};

const setRole = async (body) => {
  const result = await model.setRole(body);

  if (result.affectedRows > 0) {
    return "Registro creado";
  };

  return result;
};

const roleDestroy = async (params) => {
  const result = await model.roleDestroy(params);

  if (result.affectedRows > 0) {
    return "Registro eliminado";
  }

  return "El registro no existe";
};

const hasRole = async (params) => {
  return await model.hasRole(params);
};

module.exports = {
  findAll,
  findOne,
  store,
  update,
  destroy,
  roles,
  setRole,
  roleDestroy,
  hasRole,
}

