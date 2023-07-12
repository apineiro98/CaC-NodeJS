const model = require('../models/Roles');

const findAll = async () => {
  return model.findAll();
};

const findId = async (params) => {
  const rows = await model.findId(params)
  
  if(rows.length > 0) {
    return rows[0]
  }

  return 'No existe el registro';
  
};

const store = async (body) => {
  const result = await model.store(body);
  
  if(result.affectedRows > 0) {
    return 'Registro Creado';
  }

  return result;
};

const update = async (body) => {
  const result = await model.update(body);

  if (result.affectedRows > 0) {
    return 'Registro Actualizado';
  } else if (result.affectedRows == 0) {
    return 'El registro no existe';
  }

  return result;
};

const destroy = async (params) => {
  const result = await model.destroy(params);

  if(result.affectedRows > 0) {
    return 'Registro Eliminado';
  }
  
  return 'El registro no existe';
}

module.exports = {
  findAll,
  findId,
  store,
  update,
  destroy,
}

