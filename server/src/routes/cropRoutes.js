const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Crop = require("../models/Crop");
const User = require("../models/User"); // ADD THIS LINE

const router = express.Router();

/**
 * =========================
 * ADD crop (Protected)
 * =========================
 */
router.post("/", protect, async (req, res) => {
  try {
    const { cropName, quantity, pricePerKg, location } = req.body;

    if (!cropName || !quantity || !pricePerKg || !location) {
      return res.status(400).json({ message: "All fields required" });
    }

    const crop = await Crop.create({
      cropName,
      quantity,
      pricePerKg,
      location,
      userId: req.user.id // 🔥 from JWT token
    });

    res.status(201).json(crop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * =========================
 * GET all crops (Public) WITH SELLER INFO
 * =========================
 */
router.get("/", async (req, res) => {
  try {
    const crops = await Crop.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'name', 'email', 'location'],
          as: 'User' // This matches your association
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * =========================
 * GET crops of logged-in user (Protected)
 * =========================
 */
router.get("/my", protect, async (req, res) => {
  try {
    const crops = await Crop.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']]
    });

    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * =========================
 * DELETE crop (Protected) - NEWLY ADDED
 * =========================
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const cropId = req.params.id;
    
    // Find the crop
    const crop = await Crop.findOne({
      where: { 
        id: cropId,
        userId: req.user.id // Ensure user owns the crop
      }
    });

    if (!crop) {
      return res.status(404).json({ 
        message: "Crop not found or you don't have permission" 
      });
    }

    // Delete the crop
    await crop.destroy();
    
    res.json({ 
      message: "Crop deleted successfully" 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;