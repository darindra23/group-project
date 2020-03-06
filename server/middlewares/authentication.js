const { verify } = require("../helpers/jwt");

module.exports = {
  authentication(req, res, next) {
    let { token } = req.headers;
    try {
      req.userData = verify(token);
      next();
    } catch (err) {
      next(err);
    }
  }
};
