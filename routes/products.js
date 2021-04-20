// Import Router and Controllers
const router = require("express").Router();
const productCtrl = require("../controllers/products");

// Buy route
router.get("/buy/:id", productCtrl.buy);
// Index, get '/'
router.get("/", productCtrl.index);
// New, get '/products/new'
router.get("/new", productCtrl.new);
// Destroy, delete '/products/:id'
router.delete("/:id", productCtrl.destroy);
// Update, put '/'
router.put("/:id", productCtrl.update);
// Create, post '/products'
router.post("/", productCtrl.create);
// Edit, get '/products/:id/edit'
router.get("/:id/edit", productCtrl.edit);
// Show, get '/'
router.get("/:id", productCtrl.show);
// Wildcard route

module.exports = router;