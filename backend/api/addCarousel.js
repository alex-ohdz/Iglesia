import multer from "multer";
import path from "path";
import fs from "fs";
import { query } from "../lib/db"; // Importa la función query para interactuar con la base de datos

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
  const method = req.method;

  switch (method) {
    case "POST":
      await handlePost(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const handlePost = async (req, res) => {
  // Procesar las imágenes con multer
  await new Promise((resolve, reject) => {
    upload.array("images", 10)(req, res, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded" });
  }

  try {
    const images = req.files.map((file, index) => {
      // Guardar cada imagen en la carpeta de imágenes públicas
      const fileName = `home_carrousel_${Date.now()}_${index}.jpg`; // Nombre único para cada imagen
      const filePath = path.join(process.cwd(), "public", "images", "home_carrousel", fileName);

      // Crear la carpeta si no existe
      const dirPath = path.dirname(filePath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Guardar la imagen en el directorio adecuado
      fs.writeFileSync(filePath, file.buffer);

      return `/images/home_carrousel/${fileName}`; // Guardar solo la URL relativa
    });

    // Insertar las URLs de las imágenes en la base de datos
    const values = images.map((imageUrl) => `('${imageUrl}')`).join(", ");
    const queryText = `INSERT INTO carrousel (image_url) VALUES ${values}`;

    await query(queryText);

    // Responder con las URLs de las imágenes insertadas
    res.status(200).json({ images });
  } catch (error) {
    console.error("Error ejecutando la consulta", error);
    res.status(500).json({ error: `Error ejecutando la consulta: ${error.message}` });
  }
};

export default handler;
