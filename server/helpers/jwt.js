const jwt = require("jsonwebtoken");
// require('dotenv').config

module.exports = {
  sign(data) {
    return jwt.sign(data, process.env.SECRET);
  },
  verify(data) {
    return jwt.verify(data, process.env.SECRET);
  }
};
