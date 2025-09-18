// creating an http server => npm install express
// express
// node default library => no

// Import the express library
const express = require("express");

// create an express application
const app = express();

// function to calculate from 1 to n
function sum(n) {
  let ans = 0;
  for (let i = 1; i <= n; i++) {
    ans = ans + i;
  }
  return ans;
}

// Define a route for GET requests to the root URL ("/")
// req -> the incoming request object (from the client/browser)
// res -> the response object (used to send data back to the client)
app.get("/", function (req, res) {
  // Get query parameter 'n' from the request URL
  // Example: if URL is /?n=5 -> req.query.n = "5"
  const n = req.query.n;
  const ans = sum(n);

  // This runs when someone visits http://localhost:3000/
  // You can send a response like text, JSON, or HTML.
  res.send("hi your answer is " + ans);
});

// Start the server and make it listen on port 3000
// This means the app will be available at http://localhost:3000/
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
