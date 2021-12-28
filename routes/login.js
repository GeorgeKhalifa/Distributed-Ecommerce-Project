const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/users/login', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'login.html'));
});

router.post('/users/login', (req, res, next) => {
    
});

module.exports = router;