import multer from 'multer';
import { query } from "@/lib/db";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false, // Disable default body parser, so multer can parse the form data
  },
};

const handler = async (req, res) => {
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  upload.single('image')(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error uploading image' });
    }

    const { id, date, title, body } = req.body;
    const image = req.file;

    try {
      let updateQuery = 'UPDATE recent_activity SET date = $1, title = $2, body = $3';
      let values = [date, title, body];

      if (image) {
        const imageBase64 = image.buffer.toString('base64');
        updateQuery += ', image = $4 WHERE id = $5 RETURNING *';
        values = [...values, imageBase64, id];
      } else {
        updateQuery += ' WHERE id = $4 RETURNING *';
        values.push(id);
      }

      const result = await query(updateQuery, values);

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error updating data', error);
      res.status(500).json({ success: false, error: 'Error updating data' });
    }
  });
};

export default handler;
