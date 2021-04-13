///////////////////////////////
// Import Router
////////////////////////////////
const router = require("express").Router()
const bcrypt = require("bcryptjs")
const User = require("../models/User")

///////////////////////////////
// Custom Middleware Functions
////////////////////////////////
// Middleware to check if userId is in sessions and create req.user
const addUserToRequest = async (req, res, next) => {
    if (req.session.userId) {
      req.user = await User.findById(req.session.userId)
      next()
    } else {
      next()
    }
  }
  // Auth Middleware Function to check if user authorized for route
  const isAuthorized = (req, res, next) => {
    // check if user session property exists, if not redirect back to login page
    if (req.user) {
      //if user exists, wave them by to go to route handler
      next()
    } else {
      //redirect the not logged in user
      res.redirect("/auth/login")
    }
  }

///////////////////////////////
// Router Specific Middleware
////////////////////////////////
router.use(addUserToRequest)
///////////////////////////////
// Router Routes
////////////////////////////////
//SIGNUP ROUTES
router.get("/auth/signup", (req, res) => {
    res.render("auth/signup")
} )
  
router.post("/auth/signup", async (req, res) => {
    try {
      // generate salt for hashing
      const salt = await bcrypt.genSalt(10)
      // hash the password
      req.body.password = await bcrypt.hash(req.body.password, salt)
      // Create the User
      await User.create(req.body)
      // Redirect to login page
      res.redirect("/auth/login")
    } catch (error) {
      res.json(error)
    }
  })

//Login ROUTES
router.get("/auth/login", (req, res) => {
    res.render("auth/login")
  })
  
  router.post("/auth/login", async (req, res) => {
    try {
      // get the user
      const user = await User.findOne({ username: req.body.username });
      if (user) {
        //check if the passwords match
        const result = await bcrypt.compare(req.body.password, user.password);
        if (result) {
          // add userId property to the session object
          req.session.userId = user._id;
          // redirect
          res.redirect("/images");
        } else {
          res.json({ error: "Password does not match" });
        }
      } else {
        res.json({ error: "User Doesn't Exist" });
      }
    } catch (error) {
      res.json(error);
    }
  });
  
 //Logout Route
router.get("/auth/logout", (req, res) => {
    // remove the userId property from the session
    req.session.userId = null
    // redirect back to the main page
    res.redirect("/")
  })

    // Goals Index Route render view (we will include new form on index page) (protected by auth middleware)
router.get("/images", isAuthorized, async (req, res) => {
    // get updated user
    const user = await User.findOne({ username: req.user.username })
    // render template passing it list of goals
    res.render("images", {
      images: user.images,
    })
  })
  
  router.get("/images", isAuthorized, async (req, res) => {
    // pass req.user to our template
    res.render("images", {
        images: user.images,
    })
})

//goals create route when form submitted
router.post("/images", isAuthorized, async (req, res) => {
    // fetch up to date user
    const user = await User.findOne({username: req.user.username})
    // push the goal into the user
    user.images.push(req.body)
    await user.save()
    // redirect back to goals
    res.redirect("/images")
})

///////////////////////////////
// Export Router
////////////////////////////////
module.exports = router