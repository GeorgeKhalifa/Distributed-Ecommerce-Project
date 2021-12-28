const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/my-account', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'my-account.html'));
});

module.exports = router;