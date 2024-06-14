import { query } from "@/lib/db";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const result = await query('SELECT * FROM workers');
    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ success: false, error: 'Error fetching data' });
  }
};

export default handler;
