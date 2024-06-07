import { query } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { username, password } = req.body;

    try {
      // Buscar el usuario en la base de datos
      const [rows] = await query({
        query: "SELECT * FROM user WHERE username = ?",
        values: [username],
      });

      if (rows.length > 0) {
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          const token = jwt.sign(
            { username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          res.status(200).json({ token });
        } else {
          res.status(401).json({ error: "Credenciales inválidas" });
        }
      } else {
        res.status(401).json({ error: "Credenciales inválidas" });
      }
    } catch (error) {
      console.error("Error del servidor:", error); // Agregar esta línea
      res.status(500).json({ error: `Error del servidor: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: `Método ${req.method} no permitido` });
  }
}
