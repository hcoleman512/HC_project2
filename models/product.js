<<<<<<< HEAD

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
=======
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    img: String,
    price: {type: Number, minValue: 0},
    qty: {type: Number, minValue: 0}
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

>>>>>>> d782b0a8d08607fa93f9d574172e34fe3087dd8d
module.exports = Product;