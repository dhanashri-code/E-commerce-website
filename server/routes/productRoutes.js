const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const verifyToken = require("../middleware/auth");

const multer = require("multer");
const path = require("path");

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "mern-ecommerce",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 600, height: 600, crop: "limit" }],
  },
});

const upload = multer({ storage });

// ✅ GET all products (with optional category filter)
router.get("/", async (req, res) => {
  const category = req.query.category;
  const filter = category ? { category } : {};
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST create new product (admin only)
router.post("/", verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json("Forbidden");
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json("Product added");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST image upload to Cloudinary
router.post("/upload", upload.single("image"), (req, res) => {
  try {
    res.json({ imageURL: req.file.path }); // Cloudinary-hosted URL
  } catch (err) {
    res.status(500).json({ error: "Image upload failed" });
  }
});

// ✅ PUT update product by ID (admin only)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE product by ID (admin only)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;


module.exports = router;
