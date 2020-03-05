"use strict";
const { hashed } = require("../helpers/hashed");
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class User extends Model {}
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name Cannot Be Empty."
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email Cannot Be Empty."
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password Cannot Be Empty."
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(instance, options) {
          return hashed(instance.password).then(hashed => {
            instance.password = hashed;
          });
        }
      },
      sequelize
    }
  );

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
