import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { updateActivityRecord } from "@backend/services/activities";

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

    const { id, date, title, body } = req.body as {
      id: string;
      date: string;
      title: string;
      body: string;
    };
    const image = (req as any).file as Express.Multer.File | undefined;

    try {
      const updatedActivity = await updateActivityRecord(Number(id), {
        date,
        title,
        body,
        imageBase64: image ? image.buffer.toString("base64") : undefined,
      });

      if (!updatedActivity) {
        return res
          .status(404)
          .json({ success: false, error: "Activity not found" });
      }

      res.status(200).json({ success: true, data: updatedActivity });
    } catch (error) {
      console.error("Error updating data", error);
      res.status(500).json({ success: false, error: "Error updating data" });
    }
  });
};

export default handler;
