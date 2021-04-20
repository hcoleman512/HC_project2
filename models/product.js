const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: String,
    img: String,
    price: {type: Number, minValue: 0},
    qty: {type: Number, minValue: 0}
}, {timestamps: true});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;