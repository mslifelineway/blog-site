require("dotenv").config();
// require("./src/database/mongoose");
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { errors, statusCodes } = require("./src/utls/constants");
const mongoose = require("mongoose");
const router = express.Router();

const port = process.env.PORT || 4001;
const host = process.env.HOST || "localhost";

/* mongobd connections */

mongoose
  .connect(
    `mongodb+srv://oyemukesh:OyeMukesh@123@cluster0.nhny3.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database Connected");
  });

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

fs.readdirSync(__dirname + "/src/routes").forEach(function (file) {
  const name = file.substr(0, file.indexOf("."));
  const route = require(`./src/routes/${name}.route.js`)(router, app);
  app.use(`/api/${name}`, route);
});

app.use((err, req, res, next) => {
  res.status(err.status || statusCodes.internalServerError);
  return res.json({
    error: {
      status: err.status || statusCodes.internalServerError,
      message: err.message || errors.somethingSeemsWrong,
    },
  });
});
app.listen(port, host, (err) => {
  if (err) {
    console.log("\n--------------------------------------------------");
    console.log("\tserver not started due to : ", err);
    process.exit(1);
  }
  console.log("\n--------------------------------------------------");
  console.log("\tServer is listening on port *" + port);
});
