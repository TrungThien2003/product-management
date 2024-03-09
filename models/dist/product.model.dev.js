
var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true
});
var Product = mongoose.model('Product', productSchema, "product");
module.exports = Product;