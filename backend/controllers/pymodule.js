var exec = require("child_process").exec;
var fs = require("fs");
// var uuid = require("@paralleldrive/cuid2");
const { v1: uuidv1 } = require('uuid');
var colors = require("colors");

exports.compilepy = function (code, fn) {
  var filename = uuidv1();
  var path = "./codes/" + filename + ".py";
  fs.writeFile(path, code, function (err) {
    if (!err) {
      var command = "python " + path;
      exec(command, function (error, stdout, stderr) {
        if (error) {
          if (
            error.toString().indexOf("Error: stdout maxBuffer exceeded.") != -1
          ) {
            var out = {
              error:
                "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
            };
            fn(out);
          } else {
            console.log(
              "INFO: ".green +
                filename +
                ".py contained an error while executing"
            );
            console.log(code);
            var out = { error: stderr };
            fn(out);
          }
        } else {
          console.log(
            "INFO: ".green + filename + ".py successfully executed !"
          );
          var out = { output: stdout };
          fn(out);
        }
      });
    }
  });
};

exports.compilepywithinput = function (code, input, fn) {
  var filename = uuidv1();
  var path = "./codes/" + filename + ".py";
  var pathdusra = "./codes/" + filename + "input.txt";
  fs.writeFile(path, code, function (err) {
    if (!err) {
      fs.writeFile(pathdusra, input, function (err) {
        if(err) {
          console.log(err);
        }
        if (!err) {
          var command = "python " + path + "< " + pathdusra;
          exec(command, function (error, stdout, stderr) {
            if (error) {
              if (
                error.toString().indexOf("Error: stdout maxBuffer exceeded.") !=
                -1
              ) {
                var out = {
                  error:
                    "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
                };
                fn(out);
              } else {
                console.log(
                  "INFO: ".green +
                    filename +
                    ".py contained an error while executing"
                );

                var out = { error: stderr };
                fn(out);
              }
            } else {
              console.log(
                "INFO: ".green + filename + ".py successfully executed !"
              );

              var out = { output: stdout };
              fn(out);
            }
          });
        }
      });
    }
  });
};
