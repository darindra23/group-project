const routes = require("express").Router();
const Controller = require("../controllers/user");

routes.post("/register", Controller.register);
routes.post("/login", Controller.login);

module.exports = routes;
