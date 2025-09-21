import type { NextApiRequest, NextApiResponse } from "next";
import { listWorkers } from "@backend/services/workers";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const workers = await listWorkers();
    res.status(200).json({ success: true, data: workers });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching data" });
  }
}
