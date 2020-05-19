const express = require("express");
const app = express();
const uuid = require("uuid");

const configRoutes = require("./routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

configRoutes(app);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(3001, () => {
  console.log("API server live on http://localhost:3001");
});
