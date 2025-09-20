import type { NextApiResponse } from "next";
import type { SessionRequest } from "@backend/types/session";
import { clearUserSession } from "@backend/services/auth";
import { withSession } from "@backend/utils/session";

export default async function handler(req: SessionRequest, res: NextApiResponse) {
  try {
    await withSession(req, res);

    if (req.method !== "POST") {
      return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }

    await clearUserSession(req);
    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    console.error("Error en logout:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}
