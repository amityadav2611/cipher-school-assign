const { truncate } = require("fs");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//-----------------Category Schema-----------------

const categorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  }
});

//-----------------Product Schema-----------------

const productSchema = new Schema({
  productName: {
    type: String,
    required: true,
  },
  Description: String,
  Price: {
    type: String,
    required: true,
  },
  category: [categorySchema],
  Quantity: Number
});

// ------------Model and Export-------------------

const ProductInfo = mongoose.model("product", productSchema);

module.exports = ProductInfo;
