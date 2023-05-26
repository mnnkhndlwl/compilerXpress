var express = require("express");
var path = require("path");
var app = express();
var compilePython = require('./modules/pymodule');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/compilecode", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var inputRadio = req.body.inputRadio;
  var lang = req.body.lang;
  if (lang === "Python") {
    // if (inputRadio === "true") {
    //   var envData = { OS: "windows" };
    //   compiler.compilePythonWithInput(envData, code, input, function (data) {
    //     res.send(data);
    //   });
    // } else {
      // var envData = { OS: "windows" };
      compilePython.compilepy(code, function (data) {
        res.send(data);
      });
   // }
  }
  
});

app.listen(5000, () => {
  console.log(`Listening on port 5000!`);
});
