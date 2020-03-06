const routes = require("express").Router();
const Controller = require("../controllers/match");

routes.get("/", Controller.showMatch);


module.exports = routes;
