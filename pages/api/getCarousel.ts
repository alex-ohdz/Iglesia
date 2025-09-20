import type { NextApiRequest, NextApiResponse } from "next";
import { listCarouselImages } from "@backend/services/carousel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const images = await listCarouselImages();
    res.status(200).json({ success: true, data: images });
  } catch (error) {
    console.error("Error fetching images", error);
    res.status(500).json({ error: "Error fetching images" });
  }
}
