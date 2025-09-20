import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export type QueryResult<T = unknown> = {
  rows: T;
  rowCount: number;
};

export const query = async <T = unknown>(sql: string, values?: unknown[]): Promise<QueryResult<T>> => {
  const [rows] = await pool.execute(sql, values);

  if (Array.isArray(rows)) {
    return {
      rows: rows as T,
      rowCount: rows.length,
    };
  }

  const result = rows as mysql.ResultSetHeader;
  return {
    rows: result as T,
    rowCount: result.affectedRows ?? 0,
  };
};
