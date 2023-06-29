const { conn } = require('../config/db');

const findAll = async () => {
  try {
    const [rows] = await conn.query('SELECT * FROM `users`');
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};

const findId = async (params) => {
  const { id } = params;
  try {
    const [rows] = await conn.query('SELECT * FROM `users` WHERE ?', { id });
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};

const store = async (body, file) => {
  const { email, password } = body;
  // const { filename } = file;
  let image = null;
  
  if(file) {
    image = file.filename;
  }

  try {
    const [rows] = await conn.query('INSERT INTO `users` SET ?', { email, password, image });
    return rows;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return "Registro duplicado";
    };
    throw error;
  } finally {
    conn.releaseConnection();
  }
};


module.exports = {
  findAll,
  findId,
  store,
}