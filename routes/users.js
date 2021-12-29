const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
// const { body } = require('express-validator/check');
// const {validationResult} = require('express-validator/check');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.json({authenticated: false}));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.json({authenticated: false}));

// Register
router.post('/register', 

// [ body('name').trim().isLength({min: 1}),
//   body('email').trim().isLength({min: 1}),
//   body('password').trim().isLength({min: 6}),
//   body('password2').trim().isLength({min: 6}),
//   body('password').matches(body('password2')),
//   ], 
  (req, res) => {

  // const errors = validationResult(req);
  // if(!errors.isEmpty()){
  //   return res.status(402).json({message: })
  // }

  const { name, email, password, password2 } = req.body;

  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    console.log('errrors in fields');

    res.status(200).json({errors: errors, st: 1});

  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        console.log('email existed');
        res.json({errors: errors, st: 2, message: 'Email already exists'});
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                console.log('email created');
                res.status(401).json({errors: errors, st: 3, message: 'You are now registered and can log in'});
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/shop',
    failureRedirect: '/users/login',
    failureFlash: true
  });
  res.json({ user: req.user});
  //res.json({loggedIn: true});
  // console.log(locals.pass);
  // res.json({message: locals.pass});
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  //res.redirect('/users/login');
  res.json({loggedout: true});
});


module.exports = router;
