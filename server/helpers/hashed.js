const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = {
  hashed(password) {
    return bcrypt.hash(password, saltRounds);
  },
  check(password, hashed) {
    return bcrypt.compare(password, hashed);
  }
};
