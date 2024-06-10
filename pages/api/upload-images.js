import multer from "multer";
import { query } from "@/lib/db";

// Configurar multer para almacenar las imágenes en memoria
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10 }, // Limitar el número máximo de archivos a 10
});

// Middleware para manejar la subida de las imágenes
export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  // Verificar el método de la solicitud
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  // Configurar multer para manejar la solicitud
  await new Promise((resolve, reject) => {
    upload.array("images", 10)(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  // Verificar que se han subido archivos
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  // Convertir las imágenes a base64 y almacenarlas en la base de datos
  try {
    const images = req.files.map(file => file.buffer.toString("base64"));
    
    const values = images.map((image, index) => `($${index + 1})`).join(", ");
<<<<<<< HEAD
    const queryText = `INSERT INTO home_carousel (data) VALUES ${values} RETURNING *`;
=======
    const queryText = `INSERT INTO home_carousel (image) VALUES ${values} RETURNING *`;
>>>>>>> parent of 02be71a (carousel)

    const result = await query(queryText, images);
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: `Error executing query: ${error.message}` });
  }
};

export default handler;
