import { query } from "@/lib/db";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req, res) => {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { id } = req.body;

  try {
    const result = await query('DELETE FROM workers WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'Worker not found' });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error('Error deleting data', error);
    res.status(500).json({ success: false, error: 'Error deleting data' });
  }
};

export default handler;
