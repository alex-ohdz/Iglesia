const mysql = require("mysql2/promise");

const connection = mysql.createConnection({
  host: "localhost", // Cambia esto según tu configuración
  user: "alex", // Cambia esto según tu configuración
  password: "root", // Cambia esto según tu configuración
  database: "iglesia", // Cambia esto según tu configuración
});


module.exports = { connection };
