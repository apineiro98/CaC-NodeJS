const { conn } = require('../config/db');

const findAll = async () => {
  try {
    //! Se utiliza await para esperar a que la consulta se resuelva.
    const [rows] = await conn.query('SELECT * FROM `roles`');
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
    const [rows] = await conn.query('SELECT * FROM `roles` WHERE ?', { id });
    return rows;
  } catch (error) {
    throw error;
  } finally {
    conn.releaseConnection();
  }
};

const store = async (body, file) => {
  // console.log(file);
  // console.log(body);
  
  const { name } = body;
  try {
    const [rows] = await conn.query('INSERT INTO `roles` SET ?', { name });
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

const update = async (params) => {
  const { id, name } = params;

  try {
    const [result] = await conn.query('UPDATE roles SET ? WHERE ?', [
      { name },
      { id },
    ]);
    return result;

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return 'Registro duplicado';
    }
    throw error;

  } finally {
    conn.releaseConnection();
  }
};

const destroy = async (params) => {
  const { id } = params;
  try {
    //! Borra las relaciones.
    await conn.query("DELETE FROM role_user WHERE ?", { role_id: id });

    const [rows] = await conn.query('DELETE FROM roles WHERE ?', { id });
    return rows;

    //! Soft Delete: Tenes que checkear que el dato no este marcado. Se usa ORM.
    // const [result] = await conn.query('UPDATE roles SET ? WHERE ?', [
    //   { delete_at: Date.now() },
    //   { id },
    // ]);
    // return result;

  } catch (error) {
    throw error;

  } finally {
    conn.releaseConnection();
  }
}

module.exports = {
  findAll,
  findId,
  store,
  update,
  destroy,
}