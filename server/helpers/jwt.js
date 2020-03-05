const jwt = require("jsonwebtoken");

module.exports = {
  sign(data) {
    return jwt.sign(data, process.env.SECRET);
  },
  verify(data) {
    return jwt.verify(data, process.env.SECRET);
  }
};
