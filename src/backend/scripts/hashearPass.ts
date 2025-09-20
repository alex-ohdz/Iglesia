import bcrypt from "bcryptjs";

const password = "$2a$10$m0SE55OTUCIDVevBB5wqA.YLn8COcSYom/yxg9YJtMdVYnZYRBHAq";

const generateHash = async (rawPassword: string) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(rawPassword, salt);
    console.log("Contraseña Hasheada:", hashedPassword);
  } catch (error) {
    console.error("Error generando el hash:", error);
  }
};

void generateHash(password);
