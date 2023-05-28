var exec = require("child_process").exec;
var fs = require("fs");
// var uuid = require("@paralleldrive/cuid2");
const { v1: uuidv1 } = require('uuid');
var colors = require("colors");

exports.compileJava = function (code, fn) {
  var dirname = uuidv1();
  path = "./codes/" + dirname;

  fs.mkdir(path, 0777, function (err) {
    if (err) console.log(err.toString().red);
    else {
      fs.writeFile(path + "/Main.java", code, function (err) {
        if (err) console.log("ERROR: ".red + err);
        else {
          console.log("INFO: ".green + path + "/Main.java created");

          var command = "cd " + path + " & " + " javac Main.java";
          exec(command, function (error, stdout, stderr) {
            if (error) {
              console.log(
                "INFO: ".green +
                  path +
                  "/Main.java contained an error while compiling"
              );
              var out = { error: stderr };
              fn(out);
            } else {
              console.log("INFO: ".green + "compiled a java file");
              var command = "cd " + path + " & java Main";
              exec(command, function (error, stdout, stderr) {
                if (error) {
                  if (
                    error
                      .toString()
                      .indexOf("Error: stdout maxBuffer exceeded.") != -1
                  ) {
                    var out = {
                      error:
                        "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
                    };
                    fn(out);
                  } else {
                    console.log(
                      "INFO: ".green +
                        path +
                        "/Main.java contained an error while executing"
                    );

                    var out = { error: stderr };
                    fn(out);
                  }
                } else {
                  console.log(
                    "INFO: ".green +
                      path +
                      "/Main.java successfully compiled and executed !"
                  );

                  var out = { output: stdout };
                  fn(out);
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.compileJavaWithInput = function (code, input, fn) {
  var dirname = uuidv1();
  path = "./codes/" + dirname;

  fs.mkdir(path, 0777, function (err) {
    if (err) console.log(err.toString().red);
    else {
      fs.writeFile(path + "/Main.java", code, function (err) {
        if (err) console.log("ERROR: ".red + err);
        else {
          console.log("INFO: ".green + path + "/Main.java created");
          fs.writeFile(path + "/input.txt", input, function (err) {
            if (err) console.log("ERROR: ".red + err);
            else {
              var command = "cd " + path + " & " + " javac Main.java";
              exec(command, function (error, stdout, stderr) {
                if (error) {
                  console.log(
                    "INFO: ".green +
                      path +
                      "/Main.java contained an error while compiling"
                  );
                  var out = { error: stderr };
                  fn(out);
                } else {
                  console.log("INFO: ".green + "compiled a java file");
                  var command = "cd " + path + " & java Main < input.txt";
                  exec(command, function (error, stdout, stderr) {
                    if (error) {
                      console.log(
                        "INFO: ".green +
                          path +
                          "/Main.java contained an error while executing"
                      );

                      if (
                        error
                          .toString()
                          .indexOf("Error: stdout maxBuffer exceeded.") != -1
                      ) {
                        var out = {
                          error:
                            "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
                        };
                        fn(out);
                      } else {
                        var out = { error: stderr };
                        fn(out);
                      }
                    } else {
                      console.log(
                        "INFO: ".green +
                          path +
                          "/Main.java successfully compiled and executed !"
                      );

                      var out = { output: stdout };
                      fn(out);
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
};
