const express = require("express");
const hbs = require("hbs");
const fs = require("fs");
const port = process.env.PORT || 3001;
var app = express();

//  set up view engine
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partial")
hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});
//  Send a directory
app.use(express.static(__dirname + "/public"));
app.use((req, res, next) => {
  var date = new Date().toString();
  var log =`${date}, ${req.method}, ${req.url}`;
    console.log(log);
  fs.appendFile("serverlog.txt", log, (err) => {
    if(err) {
      console.log("Unable append to file;");
    }
  });
  next();
});



//  Send a page

app.get("/", (req, res) => {
  res.render("home.hbs", {
    Title: "Home Page",
    Name: "Yuhao Li",
    Welcome: "Welcome to my fisrt nodejs project"
  })
})

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    Title: "First Express Dynamic Page",
  });
})
app.listen(port, () => {
  console.log(`${port}`);
});
