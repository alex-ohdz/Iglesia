import bcrypt from 'bcryptjs';
import sessionMiddleware from '@/lib/session';
import { query } from "@/lib/db";  // Asegúrate de que la función query esté bien definida en db.js

export default async function handler(req, res) {
  try {
    // Ejecutar el middleware de sesión
    await new Promise((resolve, reject) => {
      sessionMiddleware(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    if (req.method === 'POST') {
      const { username, password } = req.body;

      try {
        // Realizar la consulta usando tu función query en lugar de sequelize.query()
        const result = await query('SELECT * FROM users WHERE username = ?', [username]);

        if (result.length === 0) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const user = result[0];  // El primer usuario en el resultado

        if (!user || !user.password) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Comparar la contraseña usando bcrypt
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Guardar el usuario en la sesión
        req.session.user = { id: user.id, username: user.username };
        await new Promise((resolve, reject) => {
          req.session.save((err) => {
            if (err) return reject(err);
            resolve();
          });
        });

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
