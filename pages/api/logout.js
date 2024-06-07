import sessionMiddleware from '@/lib/session';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    sessionMiddleware(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  if (req.method === 'POST') {
    if (req.session) {
      delete req.session.user;
    }
    res.status(200).json({ message: 'Logout exitoso' });
  } else {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
