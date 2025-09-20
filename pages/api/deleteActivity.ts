import type { NextApiRequest, NextApiResponse } from "next";
import { removeActivity } from "@backend/services/activities";

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
    const activity = await removeActivity(Number(id));

    if (!activity) {
      return res
        .status(404)
        .json({ success: false, error: "Activity not found" });
    }

    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    console.error("Error deleting data", error);
    res.status(500).json({ success: false, error: "Error deleting data" });
  }
};

export default handler;
