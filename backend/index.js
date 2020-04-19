const express = require("express");
const app = express();
const session = require("express-session");
const uuid = require("uuid");

const configRoutes = require("./routes");

// const determineUserRole = (req, res, next) => {
//   if (req.session.user) {
//     req.session.user.sessionId = req.session.id;
//     delete req.session.user.password;
//   }
//   next();
// };

// app.use(
//   session({
//     name: "AuthCookie",
//     secret: uuid(),
//     saveUninitialized: true,
//     resave: false,
//     cookie: {
//       expires: 3000000,
//     },
//   })
// );

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// app.use(determineUserRole);

configRoutes(app);

app.use("*", (req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(3001, () => {
  console.log("API server live on http://localhost:3001");
});
