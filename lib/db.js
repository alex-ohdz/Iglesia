const { Pool } = require('pg')
require('dotenv').config()

const pool = new Pool({
  connectionString: process.env.PG_URL,
})

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}
