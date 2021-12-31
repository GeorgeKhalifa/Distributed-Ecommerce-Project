const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/shop', (req, res, next) => {
    // let products = req.query.products;
    // console.log(products);
    // let products = localStorage.getItem('products');
    res.sendFile(path.join(rootDir, 'views-html', 'product-list.html'));
    
});


module.exports = router;