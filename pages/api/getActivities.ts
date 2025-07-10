import sequelize from "@/lib/db"; // Asegúrate de importar tu instancia de Sequelize

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    // Consulta directa usando sequelize.query
    const [results] = await sequelize.query('SELECT * FROM recent_activity ORDER BY id DESC');
    res.status(200).json({ success: true, data: results });
  } catch (error) {
    console.error('Error fetching data', error);
    res.status(500).json({ success: false, error: 'Error fetching data' });
  }
}
