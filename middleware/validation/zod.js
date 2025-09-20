const express = require("express");
const { z } = require("zod"); // import Zod
const app = express();

app.use(express.json()); // middleware to parse JSON body

// Define schema: body must have "kidneys" as an array of numbers
const kidneysSchema = z.object({
  kidneys: z.array(z.number())
});

// POST route: /health-checkup
app.post("/health-checkup", function (req, res) {
  // Validate input using safeParse (does not throw, returns result object)
  const result = kidneysSchema.safeParse(req.body);

  // If validation failed, respond with 400 and error details
  if (!result.success) {
    return res.status(400).json({
      msg: "Validation failed",
      errors: result.error.errors
    });
  }

  // If validation passed, extract kidneys safely
  const kidneyLength = result.data.kidneys.length;

  res.send("You have " + kidneyLength + " kidneys");
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
