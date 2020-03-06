const routes = require("express").Router();
const teamRoutes = require("./team");
const userRoutes = require("./user");
const matchRoutes = require("./match");
const { authentication } = require("../middlewares/authentication");

routes.use("/team", authentication, teamRoutes);
routes.use("/user", userRoutes);
routes.use("/match", authentication, matchRoutes);

module.exports = routes;
