const express = require("express");
const { model } = require("mongoose");
const { findByIdAndUpdate } = require("../models/product.js");
const router = express.Router();
//const authorization = require('../utils/authorization');
const Product = require("../models/product.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

/////////////////
// Routes
/////////////////


router.get('/new', (req, res) => {
    res.render("users/new.ejs");
});

router.post('/signup', (req, res) => {
    console.log(req.body);
    req.body.password = bcrypt.hashSync(
        req.body.password,
        bcrypt.genSaltSync(SALT_ROUNDS)
    );

    console.log(req.body);

    // Save the user with the hashed password
    User.create(req.body, function (err, newUser) {
        console.log(newUser)
        // Redirect back to home route
        res.redirect("users/login")
    });
});

router.get('/signin', (req, res) => {
    res.render("users/login");
});


router.post('/login', (req, res) => {
    console.log("======req.body=======", req.body);
    // Find the user in the database - we need to see if they are exist
    User.findOne({ username: req.body.username }), function (err, foundUser) {
        if(foundUser === null) {
            // if they don't exist, redirect to login
            res.redirect("/users/signin");
        } else {
            // if they do exist, compare the password, is it a match
            const isMatched = bcrypt.compareSync(
                req.body.password,
                foundUser.password
            );
            // if the password matches, log them in
            if (isMatched) {
                // add the user to a new session
                req.session.userId = foundUser._id;
                // redirect to a secure location
                res.redirect("/products");
            } else {
                // if the password is wrong, redirect back to login
                res.redirect("/users/signin");
            };
        };
    };
});

router.get('/profile', authorization.isAuthenticated, (req, res) => {
    res.render("users/profile", {
        currentUser: req.user
    });
});

router.get('/signout', (req, res) => {
    // destroy the session
    req.session.destroy(function (err) {
        // delete the req.user
        delete req.user;
        // redirect back home
        res.redirect("/");
    });
});


module.exports = router;