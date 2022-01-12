const path = require("path");
const express = require("express");
const compression = require("compression");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

const appFolder = "build";

app.use(compression());
app.use(cors());

app.use(express.static(path.join(__dirname, appFolder)));

app.all("*", (req, res) => {
  res.status(200).sendFile(`/index.html`, { root: appFolder }, (err) => {
    console.log({ err });
  });
});

app.listen(PORT, function () {
  console.log("listening on port ", PORT);
});
