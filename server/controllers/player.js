const { Player } = require("../models");
const sequelize = require("sequelize");
const Op = sequelize.Op;

class Controller {
  static getTeam(req, res, next) {
    let condition = {
      where: {
        team: {
          [Op.iLike]: `%${req.params.team}%`
        },
        position: {
          [Op.notIn]: [""]
        }
      }
    };
    Player.findAll(condition)
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
  static getPlayer(req, res, next) {
    Player.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = Controller;
