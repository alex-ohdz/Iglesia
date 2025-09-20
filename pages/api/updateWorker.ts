import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { updateWorkerRecord } from "@backend/services/workers";

const upload = multer({ storage: multer.memoryStorage() });

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  upload.single("image")(req as any, res as any, async (err: unknown) => {
    if (err) {
      return res.status(500).json({ error: "Error uploading image" });
    }

    const { id, name, rol } = req.body as { id: string; name: string; rol: string };
    const image = (req as any).file as Express.Multer.File | undefined;

    try {
      const updatedWorker = await updateWorkerRecord(Number(id), {
        name,
        rol,
        imageBase64: image ? image.buffer.toString("base64") : undefined,
      });

      if (!updatedWorker) {
        return res
          .status(404)
          .json({ success: false, error: "Worker not found" });
      }

      res.status(200).json({ success: true, data: updatedWorker });
    } catch (error) {
      console.error("Error updating data", error);
      res.status(500).json({ success: false, error: "Error updating data" });
    }
  });
};

export default handler;
