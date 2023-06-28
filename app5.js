/* 5. Make a promisifed function for the functioan having callback below , after the
function is promisifed then call the function like you call a promise  */

const request = require("request");

function getGoogleHomePage() {
  return new Promise((resolve, reject) => {
    request("http://www.google.com", function (error, response, body) {
      console.error("error:", error);
      console.log("statusCode:", response && response.statusCode);
      console.log("body:", body);

      if (error) {
        reject(error);
      } else {
        resolve(body);
      }
    });
  });
}

getGoogleHomePage()
  .then((result) => {
    console.log("RESULT==>", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
