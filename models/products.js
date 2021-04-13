const mongoose = require('mongoose');

// The Goal Schema
const Image = new Schema({
    url: String,
  })
  

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    img: String,
    price: {type: Number, minValue: 0},
    qty: {type: Number, minValue: 0}
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;