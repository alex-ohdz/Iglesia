import type { NextApiResponse } from "next";
import type { SessionRequest } from "@backend/types/session";
import { persistUserSession, verifyCredentials } from "@backend/services/auth";
import { withSession } from "@backend/utils/session";

export default async function handler(req: SessionRequest, res: NextApiResponse) {
  try {
    await withSession(req, res);

    if (req.method !== "POST") {
      return res.status(405).json({ error: `Método ${req.method} no permitido` });
    }

    const { username, password } = req.body as { username: string; password: string };

    const sessionUser = await verifyCredentials(username, password);

    if (!sessionUser) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    await persistUserSession(req, sessionUser);

    res.status(200).json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
}
