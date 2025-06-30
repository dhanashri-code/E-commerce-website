const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageURL: String,
  category: {
    type: String,
    enum: ["electronics", "fashion", "books", "home", "other"],
    required: true,
  },
  inStock: Boolean,
});


module.exports = mongoose.model("Product", productSchema);
