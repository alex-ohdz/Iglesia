const bcrypt = require('bcryptjs');

const password = 'admin';

const generateHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Contraseña Hasheada:', hashedPassword);
  } catch (error) {
    console.error('Error generando el hash:', error);
  }
};

generateHash(password);
