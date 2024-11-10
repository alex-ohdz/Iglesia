import mysql from "mysql2";

// Configura la conexión con tu base de datos MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST, // o tu host de base de datos
  user: process.env.MYSQL_USER, // tu usuario
  password: process.env.MYSQL_PASSWORD, // tu contraseña
  database: process.env.MYSQL_DATABASE,
});

export const query = (sql, values) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};
