const path = require("path");
const express = require("express");
const mongooseLoader = require("./db");
const socketLoader = require("./sockets");
const cors = require("cors");
const routes = require("./routes");
const env = require("./env");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke! msg: " + err.message);
});

const server = socketLoader(app);

mongooseLoader()
  .then(() => {
    console.log("Db loaded and connected");
    server.listen(env.PORT, () => {
      console.log(`Server on port ${ env.PORT }`);
    });
  })
  .catch((err) => console.log(err));
