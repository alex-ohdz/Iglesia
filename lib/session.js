import session from "express-session";
import pool from "./db";

const sessionMiddleware = session({
  store: pool,
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  sslmode: require,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // 1 día
  },
});

export default sessionMiddleware;
