import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const result = await query('SELECT * FROM recent_activity ORDER BY id DESC');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ success: false, error: 'Error fetching data' });
  }
}
