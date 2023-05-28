var express = require("express");
var path = require("path");
var app = express();
var compilePython = require("./controllers/pymodule");
var compileJava = require("./controllers/javamodule");
var compileCPP = require('./controllers/cppmodule');
var cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/apna.html");
});

app.post("/compilecode", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var inputRadio = req.body.inputRadio;
  var lang = req.body.lang;

  if (lang === "Python") {
    if (inputRadio === true) {
      compilePython.compilepywithinput(code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    } else {
      compilePython.compilepy(code, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    }
  } else if (lang === "Java") {
    if (inputRadio === true) {
      compileJava.compileJavaWithInput(code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    } else {
      compileJava.compileJava(code, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    }
  }
 else if (lang === "C" || lang === "C++") {
    if (inputRadio === true) {
     // var envData = { OS: "windows", cmd: "g++" };
      compileCPP.compileCPPWithInput( code, input, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    } else {
      var envData = { OS: "windows", cmd: "g++" };
      compileCPP.compileCpp( envData,code, function (data) {
        if (data.error) {
          res.send(data.error);
        } else {
          res.send(data.output);
        }
      });
    }
  }
});

app.listen(3001, () => {
  console.log(`Listening on port 3001!`);
});
