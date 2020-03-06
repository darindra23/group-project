const { User } = require("../models");
const { sign, verify } = require("../helpers/jwt");
const createError = require("http-errors");
const { check } = require("../helpers/hashed");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const generator = require("generate-password");
const { sendgrid } = require("../helpers/sendgrid");

class Controller {
  static register(req, res, next) {
    User.create(req.body, { individualHooks: true })
      .then(user => {
        return sendgrid(req.body.email, req.body.password);
      })
      .then(() => {
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
    let dataUser;
    User.findOne(condition)
      .then(data => {
        if (!data) {
          throw createError(404);
        } else {
          dataUser = data;
          return check(req.body.password, data.password);
        }
      })
      .then(result => {
        if (result) {
          let token = sign({
            id: dataUser.id,
            email: dataUser.email
          });
          let fullname = dataUser.fullname;
          res.status(200).json({ token, fullname });
        } else {
          throw createError(400);
        }
      })
      .catch(err => {
        next(err);
      });
  }
  static googleLogin(req, res, next) {
    let fullname;
    let email;
    let token;
    let password = generator.generate({
      length: 10,
      numbers: true
    });
    client
      .verifyIdToken({
        idToken: req.body.id_token,
        audience: process.env.CLIENT_ID
      })
      .then(ticket => {
        const payload = ticket.getPayload();
        let condition = {
          where: {
            email: payload.email
          }
        };
        fullname = payload.name;
        email = payload.email;
        return User.findOne(condition);
      })
      .then(data => {
        if (data) {
          return data;
        } else {
          sendgrid(email, password);
          return User.create({ fullname, email, password });
        }
      })
      .then(user => {
        token = sign({
          id: user.id,
          email: user.email
        });
        res.status(200).json({ token });
      })
      .catch(err => {
        next(err);
      });
  }
  static updatePassword(req, res, next) {
    let token = req.headers.token;
    let decoded = verify(token);
    let condition = {
      where: {
        id: decoded.id
      }
    };
    let condition2 = {
      where: {
        id: decoded.id
      },
      individualHooks: true
    };
    User.findOne(condition)
      .then(data => {
        if (data) {
          let obj = {
            password: req.body.password
          };
          return User.update(obj, condition2);
        } else {
          throw createError(404);
        }
      })
      .then(data => {
        let obj = {
          message: `sukses update data`
        };
        res.status(201).json(obj);
      })
      .catch(err => {
        next(err);
      });
  }
  static delete(req, res, next) {
    let token = req.headers.token;
    let decoded = verify(token);
    let condition = {
      where: {
        id: decoded.id
      }
    };
    User.findOne(condition)
      .then(data => {
        if (data) {
          return User.destroy(condition);
        } else {
          throw createError(404);
        }
      })
      .then(data => {
        let msg = {
          message: `User id :${decoded.id} dengan email : ${decoded.email} Telah dihapus`
        };
        res.status(200).json(msg);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = Controller;
