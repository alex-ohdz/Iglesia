import tinify from "tinify";

// Establecer la clave API de TinyPNG
tinify.key = process.env.TINYPNG_API_KEY;

const optimizeImage = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    tinify.fromBuffer(fileBuffer).toBuffer((err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

export default optimizeImage;
