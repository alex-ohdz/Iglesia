import crypto from "crypto";

const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString("hex");
};

console.log(generateSessionSecret());
