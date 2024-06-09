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
  const method = req.method;

  switch (method) {
    case "POST":
      await handlePost(req, res);
      break;
    case "GET":
      await handleGet(req, res);
      break;
    case "DELETE":
      await handleDelete(req, res);
      break;
    default:
      res.setHeader("Allow", ["POST", "GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

const handlePost = async (req, res) => {
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
    const images = req.files.map(file => file.buffer.toString("base64"));
    const values = images.map((image, index) => `($${index + 1})`).join(", ");
    const queryText = `INSERT INTO home_carousel (image) VALUES ${values} RETURNING *`;

    const result = await query(queryText, images);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: `Error executing query: ${error.message}` });
  }
};

const handleGet = async (req, res) => {
  try {
    const result = await query("SELECT * FROM home_carousel");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching images", error);
    res.status(500).json({ error: "Error fetching images" });
  }
};

const handleDelete = async (req, res) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  let data = '';

  req.on('data', chunk => {
    data += chunk;
  });

  req.on('end', async () => {
    const { id } = JSON.parse(data);

    if (!id) {
      return res.status(400).json({ error: "Image ID is required" });
    }

    try {
      const result = await query("DELETE FROM home_carousel WHERE id = $1 RETURNING *", [id]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Image not found" });
      }
      res.status(200).json({ message: "Image deleted successfully", image: result.rows[0] });
    } catch (error) {
      console.error("Error deleting image", error);
      res.status(500).json({ error: "Error deleting image" });
    }
  });
};

export default handler;
