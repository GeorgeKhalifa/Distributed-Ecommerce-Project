const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/deposit_cash', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'deposite-cash.html'));
});

module.exports = router;