import type { NextApiResponse } from "next";
import type { SessionRequest } from "@backend/types/session";
import { withSession } from "@backend/utils/session";

export default async function handler(req: SessionRequest, res: NextApiResponse) {
  try {
    await withSession(req, res);

    if (req.session.user) {
      res.status(200).json({ user: req.session.user });
    } else {
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error obteniendo la sesión", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}
