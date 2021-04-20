
// Import Model and Schema
const { model, Schema } = require("../db/connection");

// Create Schema
const ProductSchema = new Schema({
    url: String,
    name: String,
    description: String,
    price: {type: Number, minValue: 0},
      qty: {type: Number, minValue: 0}
});

// Create Model
const Product = model("product", ProductSchema);

// Export Model
module.exports = Product;