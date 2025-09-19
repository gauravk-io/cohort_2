const express = require("express");

const app = express();

// Validator function to check if the user exists
// Right now, it's hardcoded to allow only one username-password combo
function usernameValidator(username, password) {
  if (username != "gaurav" && password != "pass") {
    return false;
  }
  return true;
}

// Validator function to check if the kidneyId is valid
// Only kidneys with id 1 or 2 are considered valid
function kidneyValidator(kidneyId) {
  if (kidneyId != 1 && kidneyId != 2) {
    return false;
  }
  return true;
}

app.get("/health-checkup", function (req, res) {
  // extract kidneyId from query params (not actually used here, just an example)
  const kidneyId = req.query.kidneyId;

  // USER VALIDATION (repeated in every route)
  // This block checks if the username/password is correct.
  // If invalid, it immediately stops and sends a response.
  // This exact piece of code is repeated in other routes too.
  if (!usernameValidator(req.query.username, req.query.password)) {
    res.status(403).json({
      msg: "User doesn't exist",
    });
    return;
  }

  // If validation passes, actual logic of this route runs here.
  res.send("Your heart is healthy");
});

app.put("/replace-kidney", function (req, res) {
  // extract query params
  const kidneyId = req.query.kidneyId;
  const username = req.query.username;
  const password = req.query.password;

  // USER VALIDATION (same repetition again)
  if (!usernameValidator(username, password)) {
    res.status(403).json({
      msg: "User doesn't exist",
    });
    return;
  }

  // KIDNEY VALIDATION (extra repetition specific to this route)
  // Checks if kidneyId is either 1 or 2
  // If invalid, we again stop and return an error
  if (!kidneyValidator(kidneyId)) {
    res.status(411).json({
      msg: "Wrong Inputs",
    });
    return;
  }

  // If both validations pass, actual business logic goes here
  res.send("Your heart is healthy");
});

// Starts the server on port 3000
app.listen(3000);
