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

// Get Orders by User
router.get("/", verifyToken, async (req, res) => {
  const orders = await Order.find({ userId: req.user.id }).populate("items.productId", "title price");
  res.json(orders);
});

module.exports = router;
