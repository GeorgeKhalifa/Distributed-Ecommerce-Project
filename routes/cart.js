const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/cart', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'cart.html'));
});


module.exports = router;