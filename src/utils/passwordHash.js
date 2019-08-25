const bcrypt = require('bcryptjs');

module.exports = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(11));
  },

  compareHashPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  },
};
