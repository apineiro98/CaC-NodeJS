//! Conexion con las base de datos.

require('dotenv').config(); //! Variables de entorno .env
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306,
  waitForConnections: true,  
  connectionLimit: 10, //! Maximas conexiones.
  queueLimit: 0, //! Cantidad de peticiones. 0 es ilimitado.
});

module.exports = {
  conn: pool.promise(),
}
