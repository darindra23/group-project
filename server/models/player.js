"use strict";
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;
  class Player extends Model {}
  Player.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      position: DataTypes.STRING,
      team: DataTypes.STRING
    },
    { sequelize }
  );

  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};
