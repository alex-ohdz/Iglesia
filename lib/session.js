import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import pool from './db';

const PgSession = connectPgSimple(session);

const sessionMiddleware = session({
  store: pool,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  },
});

export default sessionMiddleware;
