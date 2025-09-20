import type { NextApiRequest, NextApiResponse } from "next";
import { deleteCarouselImage } from "@backend/services/carousel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { id } = req.body as { id: number };

  if (!id) {
    return res.status(400).json({ error: "Image ID is required" });
  }

  try {
    const deleted = await deleteCarouselImage(Number(id));

    if (!deleted) {
      return res.status(404).json({ error: "Image not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Image deleted successfully", data: deleted });
  } catch (error) {
    console.error("Error deleting image", error);
    res.status(500).json({ error: "Error deleting image" });
  }
}
