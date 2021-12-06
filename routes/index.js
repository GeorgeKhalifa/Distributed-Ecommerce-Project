const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
//router.get('/',ensureAuthenticated, (req, res) => res.render('index'));

// Dashboard
router.get('/', ensureAuthenticated, (req, res) =>
  res.render('index', {
    user: req.user
  })
);

module.exports = router;