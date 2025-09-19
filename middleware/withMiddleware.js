const express = require("express");
const app = express();

//  Middleware #1: User validation
//  This middleware runs BEFORE the actual route handler.
//  It pulls username and password from the query string (req.query).
//  If credentials are wrong → send back a 403 error and stop.
//  If credentials are correct → call next() so Express moves to the next middleware/handler.

function userMiddleware(req, res, next) {
  const { username, password } = req.query; // destructure from ?username=...&password=...

  // If either username OR password is wrong, reject
  if (username !== "gaurav" || password !== "pass") {
    res.status(403).json({
      msg: "Incorrect user inputs",
    });
  } else {
    next(); // validation passed → continue to the next step
  }
}

// Middleware #2: Kidney validation
// Similar to userMiddleware, but specifically checks kidneyId.
// Extracts kidneyId from req.query (?kidneyId=...).
// If kidneyId is not 1 or 2 → send error.
// If valid → continue to next middleware/handler.
function kidneyMiddleware(req, res, next) {
  const { kidneyId } = req.query; // e.g. ?kidneyId=1

  if (kidneyId != 1 && kidneyId != 2) {
    res.status(403).json({
      msg: "Incorrect kidney input",
    });
  } else {
    next(); // kidney is valid → move to the route handler
  }
}

/**
 * Route 1: /health-checkup
 * - Needs BOTH user validation AND kidney validation.
 * - So, Express will first run userMiddleware → then kidneyMiddleware → then the handler.
 * - By the time the handler runs, we’re guaranteed both checks are passed.
 */
app.get(
  "/health-checkup",
  userMiddleware,
  kidneyMiddleware,
  function (req, res) {
    // If code reaches here, both middlewares have approved.
    res.send("Your heart is healthy");
  }
);

/**
 * Route 2: /kidney-check
 * - Same requirement: needs BOTH user + kidney validation.
 * - Reuses the same middlewares instead of duplicating the logic inside the handler.
 */
app.get("/kidney-check", userMiddleware, kidneyMiddleware, function (req, res) {
  res.send("Your kidneys are fine");
});

/**
 * Route 3: /user-check
 * - Only needs user validation (no kidney check required).
 * - Notice how we can choose which middleware to apply depending on the route.
 */
app.get("/user-check", userMiddleware, function (req, res) {
  res.send("User is valid");
});

/**
 * Start server
 * - Express listens on port 3000.
 * - Console log just to confirm server is running.
 */
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
