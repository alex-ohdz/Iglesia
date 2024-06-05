import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  let dbconnection;

  try {
    dbconnection = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB,
    });
    const [results] = await dbconnection.execute(query, values);
    return results;
  } catch (err) {
    throw new Error(`Database query failed: ${err.message}`);
  } finally {
    if (dbconnection) {
      await dbconnection.end();
    }
  }
}

// david en el .env pega esto 
// MYSQL_HOST="localhost"
// MYSQL_DB="iglesia"
// MYSQL_USER="alex"
// MYSQL_PASS="root"