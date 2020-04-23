const express = require("express");
const app = express();
const router = express.Router();
const donorRoutes = require("./donors");
const locationRoutes = require("./locations");
// const hospitalRoutes = require("./hospitals");

const constructorMethod = (app) => {
  app.use("/", router);
  app.use("/donors", donorRoutes);
  app.use("/locations", locationRoutes);
  //   app.use("/hospitals", hospitalRoutes);
  app.use("*", (req, res) => {
    res.status(404).json({
      error: `Route '${req.url}' is not available as part of the api catalog.`,
    });
  });
};

constructorMethod(app);
module.exports = constructorMethod;
