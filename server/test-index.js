const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Simple test routes
app.get("/health", (req, res) => {
    res.json({ status: "OK" });
});

app.get("/api/stats", (req, res) => {
    res.json({ 
        farmers: 1240, 
        crops: 5680, 
        orders: 8840, 
        earnings: "4.2Cr" 
    });
});

app.get("/api/routes", (req, res) => {
    res.json({ 
        routes: ["/health", "/api/stats"] 
    });
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`Stats: http://localhost:${PORT}/api/stats`);
    console.log(`Routes: http://localhost:${PORT}/api/routes`);
});