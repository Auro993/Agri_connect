const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import database connection
const { connectDB } = require("./config/db");

// Import routes - FIXED: using ./routes (inside src folder)
const authRoutes = require("./routes/authRoutes");
const cropRoutes = require("./routes/cropRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

// ========== CORS CONFIGURATION - UPDATED WITH VERCEL DOMAIN ==========
const allowedOrigins = [
    "http://localhost:3000", 
    "http://127.0.0.1:3000",
    "https://agri-connect-ten-olive.vercel.app"  // ✅ ADDED YOUR VERCEL FRONTEND
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, etc)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
    credentials: true
}));

// Parse JSON and URL encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import models
require("./models");

// ========== API ROUTES ==========
app.use("/api/auth", authRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

// ========== TEST ROUTES ==========
app.get("/", (req, res) => {
    res.json({ 
        success: true,
        message: "AgriConnect API is running 🚀",
        version: "1.0.0",
        endpoints: {
            auth: "/api/auth",
            crops: "/api/crops",
            orders: "/api/orders",
            users: "/api/users",
            stats: "/api/stats",
            health: "/health"
        }
    });
});

// Health check endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "OK",
        timestamp: new Date().toISOString(),
        database: "connected",
        server: "running"
    });
});

// ========== DEBUG ROUTE ==========
app.get("/api/routes", (req, res) => {
    try {
        const routes = [];
        
        if (app._router && app._router.stack) {
            app._router.stack.forEach(middleware => {
                if (middleware.route) {
                    routes.push({
                        path: middleware.route.path,
                        methods: Object.keys(middleware.route.methods)
                    });
                } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
                    middleware.handle.stack.forEach(handler => {
                        if (handler.route) {
                            const path = handler.route.path;
                            const methods = Object.keys(handler.route.methods);
                            routes.push({
                                path: path.startsWith('/api') ? path : `/api${path}`,
                                methods: methods
                            });
                        }
                    });
                }
            });
        }
        
        res.json({
            totalRoutes: routes.length,
            routes: routes
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Error listing routes",
            error: error.message
        });
    }
});

// ========== ERROR HANDLING ==========
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route not found: ${req.method} ${req.url}`,
        availableEndpoints: {
            auth: "/api/auth",
            crops: "/api/crops",
            orders: "/api/orders",
            users: "/api/users",
            stats: "/api/stats",
            health: "/health"
        }
    });
});

app.use((err, req, res, next) => {
    console.error("❌ Server Error:", err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? err.message : {}
    });
});

// ========== START SERVER ==========
async function startServer() {
    try {
        console.log("🔗 Connecting to database...");
        await connectDB();
        console.log("✅ Database connected successfully!");

        const PORT = process.env.PORT || 5001;

        app.listen(PORT, "0.0.0.0", () => {
            console.log("=".repeat(60));
            console.log(`✅ BACKEND Server running on PORT ${PORT}`);
            console.log(`🌐 Local: http://localhost:${PORT}`);
            console.log(`🌐 Health: http://localhost:${PORT}/health`);
            console.log(`🌐 Stats API: http://localhost:${PORT}/api/stats`);
            console.log(`🌐 Routes: http://localhost:${PORT}/api/routes`);
            console.log("=".repeat(60));
        });

    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
}

startServer();