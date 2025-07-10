import sessionMiddleware from '@/lib/session';

export default async function handler(req, res) {
  await new Promise((resolve, reject) => {
    sessionMiddleware(req, res, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });

  if (req.session.user) {
    res.status(200).json({ user: req.session.user });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}
