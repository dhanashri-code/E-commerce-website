const express = require("express");
const Order = require("../models/order");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Create Order
router.post("/", verifyToken, async (req, res) => {
  try {
    const order = new Order({
      userId: req.user.id,
      items: req.body.items,
      total: req.body.total,
    });
    await order.save();
    res.status(201).json("Order placed successfully");
  } catch (err) {
    res.status(500).json("Error placing order");
  }
});

// Get Orders by User (for any logged-in user)
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).populate("items.productId", "title price");
    res.json(orders);
  }
  catch (err) {
    res.status(500).json("Error fetching your orders");
  }
});

// Admin-only: Get all orders from all users
router.get("/all", verifyToken, async (req, res) => {
  // Only allow if user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json("Access denied: Admins only");
  }
  try {
    const orders = await Order.find()
      .populate("items.productId", "title price")
      .populate("userId", "name email");       // include product info
    res.json(orders);
  } catch (err) {
    res.status(500).json("Error fetching all orders");
  }
});
module.exports = router;
