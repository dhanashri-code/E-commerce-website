const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const verifyToken = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // ex: 17169734742.jpg
  }
});

const upload = multer({ storage });

router.get("/", async (req, res) => {
  const category = req.query.category;
  const filter = category ? { category } : {};
  const products = await Product.find(filter);
  res.json(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json(product);
});

router.post("/", verifyToken, async (req, res) => {
  if (!req.user.isAdmin) return res.status(403).json("Forbidden");
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json("Product added");
});

router.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:4000/uploads/${req.file.filename}`;
  res.json({ imageURL: imageUrl });
});

// PUT update product by ID
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

// DELETE product by ID
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
