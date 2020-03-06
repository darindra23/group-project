const { User } = require("../models");
const { sign } = require("../helpers/jwt");
const createError = require("http-errors");
const { check } = require("../helpers/hashed");

class Controller {
  static register(req, res, next) {
    User.create(req.body)
      .then(user => {
        res.status(201).json("Data Created !");
      })
      .catch(err => {
        next(err);
      });
  }
  static login(req, res, next) {
    let condition = {
      where: {
        email: req.body.email
      }
    };
    User.findOne(condition)
      .then(data => {
        if (!data) {
          throw createError(404);
        } else {
          if (check(req.body.password, data.password)) {
            let token = sign({
              id: data.id,
              email: data.email
            });
            let fullname = data.fullname;
            res.status(200).json({ token, fullname });
          } else {
            throw createError(400);
          }
        }
      })
      .catch(err => {
        console.log('sini');
        next(err);
      });
  }
}

module.exports = Controller;
