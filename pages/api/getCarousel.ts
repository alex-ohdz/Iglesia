<<<<<<< HEAD
<<<<<<< HEAD
import { query } from "@/lib/db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  try {
    const result = await query("SELECT * FROM home_carousel");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching images", error);
    res.status(500).json({ error: "Error fetching images" });
  }
}
=======
// import { query } from "@/lib/db";
=======
import { query } from "@/lib/db";
>>>>>>> fca4660 (cambiando a sql)

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

<<<<<<< HEAD
//   try {
//     const result = await query("SELECT * FROM home_carousel");
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error("Error fetching images", error);
//     res.status(500).json({ error: "Error fetching images" });
//   }
// }
>>>>>>> 7f8deaf (Descripción de los cambios realizados)
=======
  try {
    const result = await query("SELECT * FROM carrousel");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching images", error);
    res.status(500).json({ error: "Error fetching images" });
  }
}
>>>>>>> fca4660 (cambiando a sql)
