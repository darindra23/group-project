require("dotenv").config;
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { handler } = require("./middlewares/errorHandler");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
app.use(handler);

app.listen(PORT, () => console.log("Listening On Port :", PORT));
