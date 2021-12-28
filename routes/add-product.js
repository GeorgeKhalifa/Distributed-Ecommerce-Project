const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/add_product', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'add-product.html'));
});

module.exports = router;