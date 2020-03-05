const routes = require("express").Router();
const Controller = require("../controllers/player");

routes.get("/", Controller.getPlayer);
routes.get("/:team", Controller.getTeam);

module.exports = routes;
