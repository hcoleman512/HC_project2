// Import Schema and Model
const {Schema, model} = require("../db/connection")

<<<<<<< HEAD
// // The product Schema
=======
// // // The product Schema
>>>>>>> d782b0a8d08607fa93f9d574172e34fe3087dd8d
// const Product = new Schema({
//   url: String,
//   name: String,
//   description: String,
//   price: {type: Number, minValue: 0},
//     qty: {type: Number, minValue: 0}
// })
  // The User Schema
  const UserSchema = new Schema(
    {
      username: { type: String, unique: true, required: true },
      password: { type: String, required: true },
      // The Products property defined as an array of objects that match the Goal schema
<<<<<<< HEAD
 //     products: [Product],  
=======
//      products: [Product],  
>>>>>>> d782b0a8d08607fa93f9d574172e34fe3087dd8d
    }, { timestamps: true }
  );
  
  // The User Model
  const User = model("User", UserSchema);
  
  // Export the User Model
  module.exports = User