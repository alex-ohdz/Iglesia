import multer from 'multer';
import { query } from "@/lib/db";

// Configurar multer para almacenar las imágenes en memoria
const upload = multer({
  storage: multer.memoryStorage(),
});

// Middleware para manejar la subida de una imagen
export const config = {
  api: {
    bodyParser: false, // Deshabilitar el analizador de cuerpo predeterminado de Next.js
  },
};

const handler = async (req, res) => {
  if (req.method === 'POST') {
    try {
      // Procesar la solicitud de carga de imagen
      await new Promise((resolve, reject) => {
        upload.single('image')(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const { date, title, body } = req.body;
      const image = req.file;

      if (!image) {
        return res.status(400).json({ success: false, error: 'No image provided' });
      }

      // Convertir la imagen a Base64
      const imageBase64 = image.buffer.toString('base64');

      // Insertar los datos en la base de datos
      const result = await query(
        'INSERT INTO recent_activity (date, title, body, image) VALUES ($1, $2, $3, $4) RETURNING *',
        [date, title, body, imageBase64]
      );

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error('Error inserting data', error);
      res.status(500).json({ success: false, error: 'Error inserting data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
