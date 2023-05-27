var exec = require("child_process").exec;
var fs = require("fs");
var uuid = require("@paralleldrive/cuid2");
var colors = require("colors");

exports.compileCpp = function (envData, code, fn) {
  var filename = uuid.createId();
  path = "./codes/" + filename + ".cpp";
  var pathdusra = "./codes/" + filename + ".exe";
  var paththree = "./codes/" + filename + ".out";
  console.log("call without input");
  fs.writeFile(path, code, function (err) {
    if (err) {
      console.log("ERROR: ".red + err);
    } else {
      console.log("INFO: ".green + filename + ".cpp created");
      if (envData.cmd === "g++") {
        command = "g++ " + path + " -o " + pathdusra;
        exec(command, function (error, stdout, stderr) {
          if (error) {
            console.log(
              "INFO: ".green +
                filename +
                ".cpp contained an error while compiling"
            );

            var out = { error: stderr };
            fn(out);
          } else {
            var progNotFinished = true;
            var tempcommand = "cd codes & " + filename;
            exec(tempcommand, function (error, stdout, stderr) {
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
                      filename +
                      ".cpp contained an error while executing"
                  );

                  var out = { error: stderr };
                  fn(out);
                }
              } else {
                if (progNotFinished) {
                  progNotFinished = false; // programme finished

                  console.log(
                    "INFO: ".green +
                      filename +
                      ".cpp successfully compiled and executed !"
                  );

                  var out = { output: stdout };
                  fn(out);
                }
              }
            });
          }
        });
      } else if (envData.cmd === "gcc") {
        //compile c code
        commmand =
          "gcc " + path + " -o " + paththree;
        exec(commmand, function (error, stdout, stderr) {
          if (error) {
            console.log(
              "INFO: ".green +
                filename +
                ".cpp contained an error while compiling"
            );

            var out = { error: stderr };
            fn(out);
          } else {
            exec(paththree, function (error, stdout, stderr) {
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
                      filename +
                      ".cpp contained an error while executing"
                  );

                  var out = { error: stderr };
                  fn(out);
                }
              } else {
                console.log(
                  "INFO: ".green +
                    filename +
                    ".cpp successfully compiled and executed !"
                );

                var out = { output: stdout };
                fn(out);
              }
            });
          }
        });
      } else {
        console.log("ERROR: ".red + "choose either g++ or gcc ");
      }
    }
  });
};

// exports.compileCPPWithInput = function ( envData,code, input, fn) {
//   var filename = uuid.createId();
//   path = "./codes/";

//   //create temp0
//   fs.writeFile(path + filename + ".cpp", code, function (err) {
//     if (err) console.log("ERROR: ".red + err);
//     else {
//       console.log("INFO: ".green + filename + ".cpp created");
//      if (envData.cmd === "g++") {
//         //compile c code
//         commmand = "g++ " + path + filename + ".cpp -o " + path + filename + ".exe";
//         exec(commmand, function (error, stdout, stderr) {
//           if (error) {
//             console.log(
//               "INFO: ".green +
//                 filename +
//                 ".cpp contained an error while compiling"
//             );

//             var out = { error: stderr };
//             fn(out);
//           } else {
//             if (input) {
//               var inputfile = filename + "input.txt";

//               fs.writeFile(path + inputfile, input, function (err) {
//                 if (err) console.log("ERROR: ".red + err);
//                 else
//                   console.log(
//                     "INFO: ".green + inputfile + " (inputfile) created"
//                   );
//               });
//               var progNotFinished = true;
//               var tempcommand = "cd codes & "+ filename + ".exe";

//               exec(
//                 + tempcommand + "<" + inputfile,
//                 function (error, stdout, stderr) {
//                   if (error) {
//                     if (
//                       error
//                         .toString()
//                         .indexOf("Error: stdout maxBuffer exceeded.") != -1
//                     ) {
//                       var out = {
//                         error:
//                           "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
//                       };
//                       fn(out);
//                     } else {
//                       console.log(
//                         "INFO: ".green +
//                           filename +
//                           ".cpp contained an error while executing"
//                       );

//                       var out = { error: stderr };
//                       fn(out);
//                     }
//                   } else {
//                     if (progNotFinished) {
//                       progNotFinished = false;

//                       console.log(
//                         "INFO: ".green +
//                           filename +
//                           ".cpp successfully compiled and executed !"
//                       );

//                       var out = { output: stdout };
//                       fn(out);
//                     }
//                   }
//                 }
//               );
//             //   if (envData.options.timeout) {
//             //     // kill the programme after envData.options.timeout ms
//             //     setTimeout(function () {
//             //       exec(
//             //         "taskkill /im " + filename + ".exe /f > nul",
//             //         function (error, stdout, stderr) {
//             //           if (progNotFinished) {
//             //             progNotFinished = false; // programme finished

//             //             console.log(
//             //               "INFO: ".green +
//             //                 filename +
//             //                 ".exe was killed after " +
//             //                 envData.options.timeout +
//             //                 "ms"
//             //             );

//             //             var out = { timeout: true };
//             //             fn(out);
//             //           }
//             //         }
//             //       );
//             //     }, envData.options.timeout);
//             //   }
//             // } //input not provided
//            // else {
//               console.log(
//                 "INFO: ".green + "Input mission for " + filename + ".cpp"
//               );

//               var out = { error: "Input Missing" };
//               fn(out);
//            // }
//           }
//         }});
//       } 
//       else if (envData.cmd == "gcc") {
//         //compile c code
//         commmand =
//           "gcc " + path + filename + ".cpp -o " + path + filename + ".out";
//         exec(commmand, function (error, stdout, stderr) {
//           if (error) {
//             console.log(
//               "INFO: ".green +
//                 filename +
//                 ".cpp contained an error while compiling"
//             );

//             var out = { error: stderr };
//             fn(out);
//           } else {
//             if (input) {
//               var inputfile = filename + "input.txt";

//               fs.writeFile(path + inputfile, input, function (err) {
//                 if (err) console.log("ERROR: ".red + err);
//                 else
//                   console.log(
//                     "INFO: ".green + inputfile + " (inputfile) created"
//                   );
//               });

//               exec(
//                 path + filename + ".out" + " < " + path + inputfile,
//                 function (error, stdout, stderr) {
//                   if (error) {
//                     if (
//                       error
//                         .toString()
//                         .indexOf("Error: stdout maxBuffer exceeded.") != -1
//                     ) {
//                       var out = {
//                         error:
//                           "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
//                       };
//                       fn(out);
//                     } else {
//                       console.log(
//                         "INFO: ".green +
//                           filename +
//                           ".cpp contained an error while executing"
//                       );

//                       var out = { output: stderr };
//                       fn(out);
//                     }
//                   } else {
//                     console.log(
//                       "INFO: ".green +
//                         filename +
//                         ".cpp successfully compiled and executed !"
//                     );

//                     var out = { output: stdout };
//                     fn(out);
//                   }
//                 }
//               );
//             } //no input file
//             else {
//               console.log(
//                 "INFO: ".green + "Input mission for " + filename + ".cpp"
//               );

//               var out = { error: "Input Missing" };
//               fn(out);
//             }
//           }
//         });
//       } 
//       else {
//         console.log("ERROR: ".red + "choose either g++ or gcc ");
//       }
//    } //end of else err
//   }); //end of write file
// }; //end of compileCPPWithInput


exports.compileCPPWithInput = function (code, input, fn) {
    const filename = uuid.createId();
    const path = "./codes/";
    console.log("call to input");
    // Create temporary directory
    fs.mkdir(path + filename, { recursive: true }, function (err) {
      if (err) {
        console.log("ERROR: " + err);
        return;
      }
  
      // Write C++ code to file
      fs.writeFile(path + filename + "/main.cpp", code, function (err) {
        if (err) {
          console.log("ERROR: " + err);
          return;
        }

        fs.writeFile(path + filename + "/input.txt", input, function (err) {
            if (err) {
              console.log("ERROR: " + err);
              return;
            }
        })
        console.log("INFO: " + filename + "/main.cpp created");
  
        // Compile C++ code
        const compileCommand = "g++ " + path + filename + "/main.cpp -o " + path + filename + "/main";
        exec(compileCommand, function (error, stdout, stderr) {
          if (error) {
            console.log("INFO: " + filename + "/main.cpp contained an error while compiling");
            const out = { error: stderr };
            fn(out);
          } else {
            console.log("INFO: " + filename + "/main.cpp successfully compiled");
  
            // Execute compiled program with input from input.txt // yaha main se phle dot tha
            const executeCommand = "cd " + path + filename + " & main.exe < input.txt";
            exec(executeCommand, function (error, stdout, stderr) {
              if (error) {
                console.log("INFO: " + filename + "/main.cpp contained an error while executing");
  
                if (error.toString().indexOf("Error: stdout maxBuffer exceeded.") !== -1) {
                  const out = {
                    error: "Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.",
                  };
                  fn(out);
                } else {
                  const out = { error: stderr };
                  fn(out);
                }
              } else {
                console.log("INFO: " + filename + "/main.cpp successfully executed");
  
                const out = { output: stdout };
                fn(out);
              }
            });
          }
        });
      });
    });
  };