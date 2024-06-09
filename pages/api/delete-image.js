// pages/api/delete-image.js
import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { id } = req.body;

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
}
