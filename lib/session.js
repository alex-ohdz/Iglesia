import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import mysql from 'mysql2';

// Configurar la conexión a MySQL
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

// Crear el almacenamiento de sesiones en MySQL
const sessionStore = new MySQLStore({}, connection);

// Configurar el middleware de sesión
const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  },
  store: sessionStore,  // Usa el almacenamiento de sesiones de MySQL
});

export default sessionMiddleware;
