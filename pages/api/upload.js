import nextConnect from "next-connect";
import multer from "multer";
import { connection } from "../../lib/db";

const upload = multer({
  storage: multer.memoryStorage(),
});

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error in API route:', error);
    res.status(501).json({ 
      error: `Algo va mal: ${error.message}`,
      stack: error.stack,
      details: error
    });
  },
  onNoMatch(req, res) {
    res.status(405).json({
      error: `Metodo ${req.method} No Permitido`,
    });
  },
});

apiRoute.use(upload.single("image"));

function imageToBase64(buffer) {
  try {
    // const image = fs.readFileSync(image);
    return image.toString("base64");
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}
apiRoute.post(async (req, res) => {
  const imgBuffer = req.file.buffer;
  const base64Img = imageToBase64(imgBuffer);

  try {
    const [result] = await connection.query(
      "INSERT INTO home_carousel (data) VALUES (?)",
      [base64Img]
    );
    res
      .status(200)
      .json({ message: "Image uploaded Successfully", id: result.insertId });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      stack: error.stack,
      sqlMessage: error.sqlMessage || null,
      sqlState: error.sqlState || null,
    });
  }
});
export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
