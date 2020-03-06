"use strict";
const axios = require("axios").default;

module.exports = {
  up: (queryInterface, Sequelize) => {
    return axios
      .get("https://www.balldontlie.io/api/v1/players?page=31&&per_page=100")
      .then(data => {
        let newData = data.data.data;
        let player = [];
        newData.forEach(i => {
          player.push({
            first_name: i.first_name,
            last_name: i.last_name,
            position: i.position,
            team: i.team.full_name,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        });
        return queryInterface.bulkInsert("Players", player, {});
      });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Players", null, {});
  }
};
