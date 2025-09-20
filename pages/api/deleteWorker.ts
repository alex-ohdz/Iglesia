import type { NextApiRequest, NextApiResponse } from "next";
import { removeWorker } from "@backend/services/workers";

export const config = {
  api: {
    bodyParser: true,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "DELETE") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const { id } = req.body as { id: number };

  try {
    const worker = await removeWorker(Number(id));

    if (!worker) {
      return res
        .status(404)
        .json({ success: false, error: "Worker not found" });
    }

    res.status(200).json({ success: true, data: worker });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).json({ success: false, error: "Error deleting data" });
  }
};

export default handler;
