const routes = require("express").Router();
const Controller = require("../controllers/user");

routes.post("/register", Controller.register);
routes.post("/login", Controller.login);
routes.post("/google", Controller.googleLogin);
routes.put("/update", Controller.updatePassword);
routes.delete("/delete", Controller.delete);

module.exports = routes;
