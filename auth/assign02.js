const jwt = require("jsonwebtoken");
const zod = require("zod");

// Secret key that will be used to sign and verify JWT tokens
const jwtPassword = "secret";

// Define a schema for validating user input (username and password)
const userSchema = zod.object({
  username: zod.string().email(), // must be a valid email
  password: zod.string().min(6), // must be at least 6 characters long
});

// Function to generate a JWT token if inputs are valid
function GenerateToken(username, password) {
  // Validate inputs using Zod schema
  const result = userSchema.safeParse({ username, password });

  // If validation fails, return null (no token will be generated)
  if (!result.success) {
    return null;
  }

  // If validation passes, sign a new token with the username as payload
  const token = jwt.sign({ username }, jwtPassword);
  return token;
}

// Function to decode a JWT without verifying its signature
function decodeToken(token) {
  try {
    // jwt.decode just decodes payload, does not verify authenticity
    const decoded = jwt.decode(token);
    return !!decoded; // returns true if token can be decoded
  } catch {
    return false;
  }
}

// Function to verify a JWT (ensures token is valid and signed with our secret)
function VerifyToken(token) {
  try {
    jwt.verify(token, jwtPassword);
    return true; // token is valid
  } catch {
    return false; // token invalid or expired
  }
}

// Generate a token for a sample user
const token = GenerateToken("gaurav@example.com", "mypassword");
console.log("Generated Token:", token);

// Check if token can be decoded (structure-wise valid)
console.log("Can decode token:", decodeToken(token));

// Check if token can be verified (signature matches secret)
console.log("Can verify token:", VerifyToken(token));
