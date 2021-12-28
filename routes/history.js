const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/history', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'history.html'));
});

module.exports = router;