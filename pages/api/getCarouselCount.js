import { query } from "@/lib/db";

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const result = await query('SELECT COUNT(*) FROM home_carousel');
      const count = parseInt(result.rows[0].count, 10);
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching image count', error);
      res.status(500).json({ error: 'Error fetching image count' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
