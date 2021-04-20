// grab environment variables
require("dotenv").config();
// IMPORT EXPRESS
const express = require("express");
// IMPORT DATABASE CONNECTION
const mongoose = require("./db/connection");
// IMPORT MERCED LOGGER
const { log } = require("mercedlogger");
//IMPORT MIDDLEWARE
const methodOverride = require("method-override");
const morgan = require("morgan");
const cors = require("cors");
// GET PORT FROM ENV OR DEFAULT PORT
const PORT = process.env.PORT || "2021";
const SECRET = process.env.SECRET || "secret"
const HomeRouter = require("./routes/home.js");
const productRouter = require("./routes/products");

// Sessions Middleware
const session = require("express-session"); // create session cookies
const connect = require("connect-mongodb-session")(session) // store cookies in mongo

////////////////////////////
// Import Controllers
////////////////////////////

const productsController = require("./controllers/products.js");
const usersController = require("./controllers/users.js");

/////////////////////////////////////
// Create Express Application Object
/////////////////////////////////////

const app = express();

/////////////////////////////////////
// Set the View Engine
/////////////////////////////////////
app.set("view engine", "ejs");

/////////////////////////////////////
// Setup Middleware
/////////////////////////////////////
app.use(cors()); // Prevent Cors Errors if building an API
app.use(methodOverride("_method")); // Swap method of requests with _method query
app.use(express.static("public")); // serve the public folder as static
app.use(morgan("tiny")); // Request Logging
app.use(express.json()); // Parse json bodies
app.use(express.urlencoded({ extended: false })); //parse bodies from form submissions
<<<<<<< HEAD
//app.use("/products", productRouter);

=======
//app.use("/products", productsController);
>>>>>>> d782b0a8d08607fa93f9d574172e34fe3087dd8d
// SESSION MIDDLEWARE REGISTRATION (adds req.session property)
app.use(
  session({
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    saveUninitialized: true, // create session regardless of changes
    resave: true, //save regardless of changes
    store: new connect({
      uri: process.env.MONGODB_URL,
      databaseName: "sessions",
      collection: "sessions",
    }),
  })
);

/////////////////////////////////////
// Routes and Routers
/////////////////////////////////////

//HomeRouter
app.use("/", HomeRouter);
//app.use("/products")
<<<<<<< HEAD
app.use("/products", productRouter);
=======
app.get("/", (req, res) => {
  res.redirect("/products")
})

///////////////////////////////
// Controllers
///////////////////////////////
// any routes that come in for products should be sent to the products controller

app.use("/products", productsController);
app.use("/users", usersController);
>>>>>>> d782b0a8d08607fa93f9d574172e34fe3087dd8d
/////////////////////////////////////
// App Listener
/////////////////////////////////////
app.listen(PORT, () =>
  log.white("🚀 Server Launch 🚀", `Listening on Port ${PORT}`)
);
