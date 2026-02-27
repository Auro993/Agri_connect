const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Crop = require("../models/Crop");
const Order = require("../models/Order");
const User = require("../models/User"); // ADD THIS LINE

const router = express.Router();

// PLACE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { cropId, quantity } = req.body;

    if (!cropId || !quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const crop = await Crop.findByPk(cropId);
    if (!crop) {
      return res.status(404).json({ message: "Crop not found" });
    }

    if (quantity > crop.quantity) {
      return res.status(400).json({ message: "Not enough quantity available" });
    }

    const totalPrice = quantity * crop.pricePerKg;

    // Create order
    const order = await Order.create({
      quantity,
      totalPrice,
      userId: req.user.id,
      cropId
    });

    // Reduce crop quantity
    crop.quantity -= quantity;
    await crop.save();

    res.status(201).json({
      message: "Order placed successfully",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET user's orders - NEWLY ADDED
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Crop,
          attributes: ['id', 'cropName', 'pricePerKg', 'location']
        },
        {
          model: User,
          attributes: ['id', 'name', 'email']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single order - NEWLY ADDED
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { 
        id: req.params.id,
        userId: req.user.id 
      },
      include: [
        {
          model: Crop,
          attributes: ['id', 'cropName', 'pricePerKg', 'location']
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;