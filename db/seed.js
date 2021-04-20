//Import The Database Connection
const mongoose = require("./connection");

///////////////////////////////////////////
// IMPORT YOUR MODELS BELOW
///////////////////////////////////////////
const Product = require("../models/Product");
///////////////////////////////////////////
// DO YOUR DATABASE OPERATIONS IN BELOW FUNCTION
///////////////////////////////////////////

const seed = async () => {
  // Drop the Database before seeding
  //mongoose.connection.db.dropDatabase();
  await Product.remove({})

  //*********Code Goes Here
  const products = await Product.create(
    [
      {
        name: 'Banana Split Candy Chews',
        description: 'Necco Banana Split Chews are tasty taffy candies loaded with the creamy, smooth flavor of a banana split. These nostalgic taffy chews are sure to satisfy your sweet tooth and bring you back to your carefree childhood days.',
        url: 'https://s.yimg.com/aah/blaircandy/banana-split-candy-chews-240ct-91.jpg',
        price: 7.99,
        qty: 99
      }, {
        name: 'Gumdrop Nougat',
        description: ' Nougat candy is a festive and colorful candy that is very popular around Christmas time. Gumdrop nougat is sweet, creamy, and so addictive. ',
        url: 'https://www.simplemost.com/wp-content/uploads/2018/11/Screen-Shot-2018-11-26-at-1.25.32-PM.png',
        price: 1.99,
        qty: 99
      }, {
        name: 'Bottle Caps',
        description: 'Bottle Caps look a lot like the original Sweet Tarts and Spree, but their more distinct cap-molded shape and distinct, cola-flavored taste sets them apart from these other tart favorites.',
        url: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/8/20/1/CC_Bottle-Caps_s4x3.jpg.rend.hgtvcom.966.725.suffix/1348842906358.jpeg',
        price: 3,
        qty: 99
      },{
        name: 'Necco Wafers',
        description: 'The Original Candy Wafer.',
        url: 'https://img4.mashed.com/img/gallery/old-school-candies-you-forgot-you-can-still-buy/necco-wafers-1605290641.jpg',
        price: 1.25,
        qty: 99
      }, {
        name: 'Mallo Cup',
        description: 'This cup-shaped, chocolate-covered marshmallow, but features a whipped, creamy marshmallow inside the hard chocolate shell.',
        url: 'https://images-na.ssl-images-amazon.com/images/I/81Ajqg7ZkzL._SL1500_.jpg',
        price: 1.50,
        qty: 99
      }, {
        name: 'Mary Jane Candy',
        description: 'a chewy peanut butter and molasses taffy treat.',
        url: 'https://newengland.com/wp-content/uploads/2015/07/mary-janes-candy-720x540.jpg',
        price: 1.50,
        qty: 99
      }, {
        name: 'Old Fashioned Candy Sticks',
        description: 'cherry, passion fruit, orange, sour apple, sour watermelon, sour orange, sour blue raspberry, green apple, tutti-fruiti, pina colada, raspberry, strawberry, peppermint, peaches and cream, banana, rum and butter, Butter scotch, lime, cotton candy, root beer, watermelon, blackberry, grape, lemon, pineapple, spearmint, tangerine, lemon lime, chocolate, wintergreen, bubblegum, cinnamon.',
        url: 'https://cdn3.volusion.com/herjp.syepu/v/vspfiles/photos/200087-2.gif?v-cache=1378460312',
        price: 1,
        qty: 99
      }, {
        name: 'Oh Henry!',
        description: 'Chocolate-covered peanut, caramel and fudge bar',
        url: 'https://cook.fnr.sndimg.com/content/dam/images/cook/fullset/2012/8/20/1/CC_Oh-Henry_s4x3.jpg.rend.hgtvcom.966.725.suffix/1348842939281.jpeg',
        price: 1.99,
        qty: 99
      }, {
        name: 'Bazooka',
        description: 'Bazooka isn’t the best gum overall. But it is the best bubble gum that comes with a comic strip.',
        url: 'https://images-na.ssl-images-amazon.com/images/I/912NsSufXtL._SX522_.jpg',
        price: 7.99,
        qty: 99
      }
    ]
    )
    

  //***************************** */

  mongoose.disconnect();
};

// Wait for the DB Connection to be Established
mongoose.connection.on("open", () => {
  // Run Seed Function
  seed();
});
