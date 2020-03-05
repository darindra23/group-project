const routes = require("express").Router();
const teamRoutes = require("./team");
const userRoutes = require("./user");
const { authentication } = require("../middlewares/authentication");

routes.use("/team", authentication, teamRoutes);
routes.use("/user", userRoutes);

module.exports = routes;
