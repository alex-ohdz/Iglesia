import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';
import sessionMiddleware from '@/lib/session';

export default async function handler(req, res) {
  try {
    await new Promise((resolve, reject) => {
      sessionMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (req.method === 'POST') {
      const { username, password } = req.body;

      try {
        const result = await query('SELECT * FROM "user" WHERE username = $1', [username]);

        if (result.rows.length === 0) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        req.session.user = { id: user.id, username: user.username };
        await req.session.save();

        res.status(200).json({ message: 'Inicio de sesión exitoso' });
      } catch (error) {
        console.error('Error ejecutando la consulta:', error);
        res.status(500).json({ error: 'Error del servidor' });
      }
    } else {
      res.status(405).json({ error: `Método ${req.method} no permitido` });
    }
  } catch (err) {
    console.error('Error del Middleware de Sesión:', err);
    res.status(500).json({ error: 'Error del servidor' });
  }
}
