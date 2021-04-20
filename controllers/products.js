const express = require("express");
const { model } = require("mongoose");
const router = express.Router();
const Product = require("../models/product.js");
//const User = require("../models/user.js");

/////////////////
// Routes
/////////////////

//home
router.get("/", (req, res)=> {
    res.render("home");
})

// new
router.get("/new", (req, res) => {
  res.render("products/new");
});

// BUY PRODUCT
router.get("/buy/:id", async (req, res) => {
    //grab the id
    const id = req.params.id;
    // if item is in stock, decrement the product quantity by 1
    // const product = Product.findById(id);
    // if (product.qty > 0) {
      await Product.findByIdAndUpdate(id, {$inc: {qty: -1}})
      res.redirect("/products/index")
    // } else {
    //   console.log("product purchased")
    //   res.redirect("/products/index")
    // };
  });
  

// create
router.post("/", async (req, res) => {
  const products = await Product.create(req.body, (error, result) => {
    console.log(result)
    res.redirect("/products/index");
  });
});

// index
router.get("/index", (req, res) => {
  Product.find({}, (error, products) => {
    res.render("products/index.ejs", { products });
  });
});

// seed route
router.get("/seed", async (req, res)=> {
    const products = await Product.create(
    [
      {
        name: 'Banana Split Candy Chews',
        description: 'Necco Banana Split Chews are tasty taffy candies loaded with the creamy, smooth flavor of a banana split. These nostalgic taffy chews are sure to satisfy your sweet tooth and bring you back to your carefree childhood days.',
        img: 'https://s.yimg.com/aah/blaircandy/banana-split-candy-chews-240ct-91.jpg',
        price: 5,
        qty: 99
      }, {
        name: 'Gumdrop nougat',
        description: ' Nougat candy is a festive and colorful candy that is very popular around Christmas time. Gumdrop nougat is sweet, creamy, and so addictive. ',
        img: 'https://www.simplemost.com/wp-content/uploads/2018/11/Screen-Shot-2018-11-26-at-1.25.32-PM.png',
        price: 5,
        qty: 99
      }, {
        name: 'Bottle Caps',
        description: 'Bottle Caps look a lot like the original Sweet Tarts and Spree, but their more distinct cap-molded shape and distinct, cola-flavored taste sets them apart from these other tart favorites.',
        img: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/8/20/1/CC_Bottle-Caps_s4x3.jpg.rend.hgtvcom.966.725.suffix/1348842906358.jpeg',
        price: 3,
        qty: 99
      },{
        name: 'Necco Wafers',
        description: 'The Original Candy Wafer.',
        img: 'https://img4.mashed.com/img/gallery/old-school-candies-you-forgot-you-can-still-buy/necco-wafers-1605290641.jpg',
        price: 1,
        qty: 99
      }, {
        name: 'Mallo Cup',
        description: 'This cup-shaped, chocolate-covered marshmallow, but features a whipped, creamy marshmallow inside the hard chocolate shell.',
        img: 'https://img4.mashed.com/img/gallery/old-school-candies-you-forgot-you-can-still-buy/necco-wafers-1605290641.jpg',
        price: 1,
        qty: 99
      }, {
        name: 'Mary Jane Candy',
        description: 'a chewy peanut butter and molasses taffy treat.',
        img: 'https://newengland.com/wp-content/uploads/2015/07/mary-janes-candy-720x540.jpg',
        price: 1,
        qty: 99
      }, {
        name: 'Old Fashioned Candy Sticks',
        description: 'cherry, passion fruit, orange, sour apple, sour watermelon, sour orange, sour blue raspberry, green apple, tutti-fruiti, pina colada, raspberry, strawberry, peppermint, peaches and cream, banana, rum and butter, Butter scotch, lime, cotton candy, root beer, watermelon, blackberry, grape, lemon, pineapple, spearmint, tangerine, lemon lime, chocolate, wintergreen, bubblegum, cinnamon.',
        img: 'https://cdn3.volusion.com/herjp.syepu/v/vspfiles/photos/200087-2.gif?v-cache=1378460312',
        price: 1,
        qty: 99
      }, {
        name: 'Oh Henry!',
        description: 'Chocolate-covered peanut, caramel and fudge bar',
        img: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/8/20/1/CC_Oh-Henry_s4x3.jpg.rend.hgtvcom.966.725.suffix/1348842939281.jpeg',
        price: 1,
        qty: 99
      }, {
        name: 'Bazooka',
        description: 'Bazooka isn’t the best gum overall. But it is the best bubble gum that comes with a comic strip.',
        img: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/8/20/0/CC_Bazooka_s4x3.jpg.rend.hgtvcom.966.725.suffix/1348842887892.jpeg',
        price: 1,
        qty: 99
      }
    ]
    )
    res.json(products);
});

// Show
router.get("/:id", (req, res)=> {
  Product.findById(req.params.id, (err, foundProduct) => {
    res.render("products/show.ejs", {
      product: foundProduct
    });
  });
});

//delete
router.delete("/:id", (req, res) => {
    // res.send('deleting...')
    Product.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/products/index");
    });
  });
  
// edit
router.get("/:id/edit", async (req, res) => {
  const products = await Product.findById(req.params.id, (err, foundProduct) => {
    console.log("foundProduct", foundProduct);
    res.render("products/edit", {
      product: foundProduct
    });
  });
});
// PUT/UPDATE

router.put("/:id", (req, res) => {
    if (req.body.inStock === "on") {
      req.body.inStock = true;
    } else {
      req.body.inStock = false;
    }
    // res.send(req.body)
    Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, updateModel) => {
        if (err) {
        } else {
          // res.send(updateModel);
          res.redirect(`/products/${req.params.id}`);
        }
      }
    );
  });

// export
module.exports = router;