const express = require("express");
const jwt = require("jsonwebtoken");
const jwtPassword = "123456"; // secret used for signing and verifying

const app = express();
app.use(express.json()); // parse JSON request body

// In-memory user database
const ALL_USERS = [
  {
    username: "gaurav@gmail.com",
    password: "123",
    name: "Gaurav kumar",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

// Helper function: checks if a user exists with given username & password
function userExists(username, password) {
  return ALL_USERS.some(
    (user) => user.username === username && user.password === password
  );
}

// POST /signin -> returns JWT token if user exists
app.post("/signin", function (req, res) {
  const { username, password } = req.body;

  // if user is not in our "db", reject
  if (!userExists(username, password)) {
    return res.status(403).json({
      msg: "User doesn't exist in our in-memory db",
    });
  }

  // if valid, generate a signed JWT token
  const token = jwt.sign({ username: username }, jwtPassword);

  return res.json({
    token,
  });
});

// GET /users -> returns all users except the one logged in
app.get("/users", function (req, res) {
  const token = req.headers.authorization; // JWT token should be sent in headers

  try {
    // verify the token with our secret
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;

    // filter out the current user from the list
    const otherUsers = ALL_USERS.filter((user) => user.username !== username);

    return res.json(otherUsers);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

// start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
