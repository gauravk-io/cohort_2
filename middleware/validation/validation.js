const express = require("express");
const app = express();

// express.json() is a built-in middleware
// It parses incoming JSON request bodies and makes them available under req.body
// Without this, req.body would be undefined for JSON payloads
app.use(express.json());

// POST route: /health-checkup
// Expects a JSON body with a "kidneys" array, e.g. { "kidneys": [1, 2] }
app.post("/health-checkup", function (req, res) {
  // Access the "kidneys" array from the request body
  const kidneys = req.body.kidneys;

  // Get the number of kidneys provided in the array
  const kidneyLength = kidneys.length;

  // Send a response back to the client
  res.send("You have " + kidneyLength + " kidneys");
});

// Global error handler middleware
// This is a special middleware in Express with 4 arguments: (err, req, res, next)
// It catches any errors thrown inside routes or other middlewares
// If something goes wrong anywhere in the app, Express will forward the error here
app.use(function (err, req, res, next) {
  res.json({
    msg: "Sorry something is up with our server",
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
