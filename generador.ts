const crypto = require('crypto');

function generateSessionSecret() {
  return crypto.randomBytes(32).toString('hex');
}

console.log(generateSessionSecret());
