import type { NextApiRequest, NextApiResponse } from "next";
import multer from "multer";
import { saveCarouselImages } from "@backend/services/carousel";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 10 },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    await new Promise<void>((resolve, reject) => {
      upload.array("images", 10)(req as any, res as any, (err: unknown) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });

    const files = ((req as any).files as Express.Multer.File[]) ?? [];

    if (files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const savedImages = await saveCarouselImages(files);
    res.status(200).json({ success: true, data: savedImages });
  } catch (error) {
    console.error("Error saving carousel images", error);
    res.status(500).json({ error: "Error saving carousel images" });
  }
};

export default handler;
