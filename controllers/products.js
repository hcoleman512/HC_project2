// Import Product Model
const { findByIdAndUpdate } = require("../models/Product");
const Product = require("../models/Product");

// Controller Functions

const buy = async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndUpdate(id, { $inc: { qty: -1 } }, { new: true });
  res.redirect(`/products/${id}`);
};

// Index
const index = async (req, res) => {
  const Products = await Product.find({});
  console.log(Products)
  res.render("products/index", {
    products: Products,
  });
};

const newProduct = async (req, res) => {
  res.render("products/new");
};

const destroy = async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
};

const update = async (req, res) => {
  const id = req.params.id;
  await Product.findByIdAndUpdate(id, req.body, { new: true });
  res.redirect(`/products/${id}`);
};

const create = async (req, res) => {
  await Product.create(req.body);
  res.redirect("/products");
};

const edit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("products/edit", {
    product,
  });
};

const show = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  res.render("products/show", {
    product,
  });
};

// Export Controller
module.exports = {
  buy,
  index,
  new: newProduct,
  destroy,
  update,
  create,
  edit,
  show,
};