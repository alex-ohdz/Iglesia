// session.js
import session from 'express-session';
import { query } from './db.js';

// Almacenamiento de sesión personalizado en MySQL
class MySQLSessionStore extends session.Store {
  async get(sid, callback) {
    try {
      const rows = await query('SELECT session_data FROM sessions WHERE session_id = ?', [sid]);
      if (rows.length === 0) return callback(null, null);
      callback(null, JSON.parse(rows[0].session_data));
    } catch (error) {
      callback(error);
    }
  }

  async set(sid, sessionData, callback) {
    try {
      const sessionStr = JSON.stringify(sessionData);
      const expires = Date.now() + 24 * 60 * 60 * 1000; // Expira en 1 día
      await query('REPLACE INTO sessions (session_id, session_data, expires) VALUES (?, ?, ?)', [sid, sessionStr, expires]);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }

  async destroy(sid, callback) {
    try {
      await query('DELETE FROM sessions WHERE session_id = ?', [sid]);
      callback(null);
    } catch (error) {
      callback(error);
    }
  }
}

// Middleware de sesión
const sessionMiddleware = session({
  store: new MySQLSessionStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 día
    secure: process.env.NODE_ENV === 'production',
  },
});

export default sessionMiddleware;
