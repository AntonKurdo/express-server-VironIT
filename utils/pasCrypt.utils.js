const bcrypt = require('bcrypt');

const passwordCrypt = async(password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
}

module.exports = passwordCrypt;