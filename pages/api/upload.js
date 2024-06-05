import multer from "multer";
import { query } from "@/lib/db";
import { imageToBase64 } from "@lib/processImage";

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadMiddleware = upload.single("image");

// Promisify middleware to use async/await
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Run multer middleware
      await runMiddleware(req, res, uploadMiddleware);

      // Get image buffer from the request
      const imgBuffer = req.file?.buffer;

      if (!imgBuffer) {
        return res.status(400).json({ error: "Image file is required" });
      }

      // Convert image buffer to Base64
      const base64Img = await imageToBase64(imgBuffer);

      await query({ query: "SET SESSION max_allowed_packet=67108864;" });

      // Insert image data into the database
      const result = await query({
        query: "INSERT INTO home_carousel (data) VALUES (?)",
        values: [base64Img],
      });

      // Send success response
      res
        .status(200)
        .json({ message: "Image uploaded successfully", id: result.insertId });
    } catch (error) {
      console.error("Database query failed:", error);
      res.status(500).json({
        error: error.message,
        stack: error.stack,
        sqlMessage: error.sqlMessage || null,
        sqlState: error.sqlState || null,
      });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
