const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Test server working! 🚀", time: new Date().toISOString() });
});

app.post("/api/auth/register", (req, res) => {
  console.log("Registration attempt:", req.body);
  res.json({ 
    message: "Registration successful (test)", 
    token: "test-token-123",
    user: { name: req.body.name, email: req.body.email }
  });
});

const PORT = 5001;  // Different port
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`✅ Test server running on http://127.0.0.1:${PORT}`);
});