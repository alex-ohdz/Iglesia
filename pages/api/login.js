// login.js
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import sessionMiddleware from '@/lib/session';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    sessionMiddleware(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const result = await query('SELECT * FROM users WHERE username = ?', [username]);
      if (result.length === 0) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      const user = result[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      req.session.user = { id: user.id, username: user.username };
      await new Promise((resolve, reject) => req.session.save((err) => (err ? reject(err) : resolve())));

      res.status(200).json({ message: 'Inicio de sesión exitoso' });
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Error del servidor' });
    }
  } else {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
