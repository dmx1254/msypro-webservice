// server.js
// where your node app starts

// init project
var express = require("express");
require("dotenv").config();
var app = express();
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...

app.get("/api", (req, res) => {
  const myEmptyDate = Date.now();
  const myEmptyDateunix = new Date(myEmptyDate).getTime();
  const myEmptyDateUtc = new Date(myEmptyDate).toUTCString();
  res.json({ unix: myEmptyDateunix, utc: myEmptyDateUtc });
});
app.get("/api/:date", function (req, res) {
  const { date } = req.params;
  if (/^\d*$/.test(date)) {
    const dater = parseInt(date);
    const newDateunix = new Date(dater).getTime();
    const newDateUtc = new Date(dater).toUTCString();
    res.json({ unix: newDateunix, utc: newDateUtc });
  } else if (typeof date === "string") {
    const dateParser = Date.parse(date);
    if (!isNaN(dateParser)) {
      const myDateunix = new Date(date).getTime();
      const myDateUtc = new Date(date).toUTCString();
      res.json({ unix: myDateunix, utc: myDateUtc });
    } else {
      res.json({ error: "Invalid Date" });
    }
  } else {
    res.json({ error: "Invalid Date" });
  }
});
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port" + listener.address().port);
});
