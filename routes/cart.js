const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/add_to_cart/:id', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'add-to-cart.html'));
});

router.get('/cart', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'cart.html'));
});


module.exports = router;