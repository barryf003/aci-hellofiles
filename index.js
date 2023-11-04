const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/values", (req, res) => {
  console.log(req.body);

  var filename = "/aci/logs/" + Date.now() + ".txt";
  var filename2 = "/aci/logs2/" + Date.now() + ".txt";

  fs.writeFile(filename, req.body.name, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Wrote to file");
  });

  fs.writeFile(filename2, req.body.name, function (err) {
    if (err) {
      return console.log(err);
    }

    console.log("Wrote to file - 02");
  });

  res.redirect("/");
});

app.listen(process.env.PORT || 80, function () {
  console.log("listening on port " + process.env.PORT || 80);
});
