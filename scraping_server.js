var hostname = "localhost";
var port = 8124;

var express = require("express");
const ejs = require("ejs");
const { asyncLinkgetter } = require("./scraping");

var app = express();
app.set("view engine", ejs);

app.get("/", async function (req, res) {
  if (req.query && req.query.url) {
    try {
      const { links, sorted } = await asyncLinkgetter(req.query.url);
      res.render("result.ejs", {
          url: req.query.url,
          links,
          sorted
      });
    } catch (error) {
      console.log(error);
      res.send("403 Forbidden", 403);
      return;
    }
  } else {
    res.render("layout.ejs", {
        url: ""
    });
  }
});

app.listen(port, hostname);
