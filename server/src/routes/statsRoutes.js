const express = require("express");
const router = express.Router();
const { sequelize } = require("../config/db");
const { User, Crop, Order } = require("../models"); // Import your models

// GET real dashboard stats
router.get("/", async (req, res) => {
    try {
        console.log("📊 Fetching real stats from database...");

        // 1. Count total farmers
        const farmersCount = await User.count({
            where: { role: 'farmer' }
        });

        // 2. Count total crops
        const cropsCount = await Crop.count();

        // 3. Count all orders
        const ordersCount = await Order.count();

        // 4. Calculate total earnings (sum of totalPrice from orders)
        const earnings = await Order.sum('totalPrice');
        const totalEarnings = earnings || 0;

        // Format earnings to Crores (1 Cr = 10,000,000)
        const earningsInCr = totalEarnings ? (totalEarnings / 10000000).toFixed(1) + "Cr" : "0Cr";

        console.log("✅ Real stats:", {
            farmers: farmersCount,
            crops: cropsCount,
            orders: ordersCount,
            earnings: earningsInCr
        });

        res.json({
            farmers: farmersCount,
            crops: cropsCount,
            orders: ordersCount,
            earnings: earningsInCr
        });

    } catch (error) {
        console.error("❌ Stats error:", error.message);
        
        // Return empty zeros instead of fallback numbers
        res.json({
            farmers: 0,
            crops: 0,
            orders: 0,
            earnings: "0Cr"
        });
    }
});

module.exports = router;