import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { createWorker } from "@backend/services/workers";

const upload = multer({
  storage: multer.memoryStorage(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      await new Promise<void>((resolve, reject) => {
        upload.single("image")(req as any, res as any, (err: unknown) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });

      const { name, rol } = req.body as { name: string; rol: string };
      const image = (req as any).file as Express.Multer.File | undefined;

      if (!image) {
        return res
          .status(400)
          .json({ success: false, error: "No image provided" });
      }

      const worker = await createWorker({
        name,
        rol,
        imageBase64: image.buffer.toString("base64"),
      });

      res.status(200).json({ success: true, data: worker });
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
