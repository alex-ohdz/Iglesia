import multer from "multer";
import { query } from "@/lib/db";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      await new Promise((resolve, reject) => {
        upload.single("image")(req, res, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const { name, rol } = req.body;
      const image = req.file;

      if (!image) {
        return res
          .status(400)
          .json({ success: false, error: "No image provided" });
      }

      const imageBase64 = image.buffer.toString("base64");

      const result = await query(
        "INSERT INTO workers (name, rol, image) VALUES ($1, $2, $3) RETURNING *",
        [name, rol, imageBase64]
      );

      res.status(200).json({ success: true, data: result.rows[0] });
    } catch (error) {
      console.error("Error inserting data", error);
      res.status(500).json({ success: false, error: "Error inserting data" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;
