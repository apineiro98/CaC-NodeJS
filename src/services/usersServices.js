const model = require('../models/Users');

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

const store = async (body, file) => {
  const result = await model.store(body, file);
  
  if(result.affectedRows > 0) {
    return 'Registro Creado';
  }

  return result;
};

module.exports = {
  findAll,
  findId,
  store,
}

