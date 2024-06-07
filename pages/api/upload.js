import multer from "multer";
import { query } from "@/lib/db";

// Configurar multer para almacenar la imagen en memoria
const upload = multer({
  storage: multer.memoryStorage(),
});

// Middleware para manejar la subida de la imagen
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
    upload.single("image")(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  // Verificar que se ha subido un archivo
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Convertir la imagen a base64
  const { buffer } = req.file;
  const base64Image = buffer.toString("base64");

  // Insertar la imagen en la base de datos
  try {
    const result = await query(
      "INSERT INTO home_carousel (data) VALUES ($1) RETURNING *",
      [base64Image]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: `Error executing query: ${error.message}` });
  }
};

export default handler;
