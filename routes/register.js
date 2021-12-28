const express = require('express');
const rootDir = require('../util/path');
const path = require('path');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'welcome.html'));
});

// router.get('/', (req, res, next) => {
//     if(authenticated){
//         res.status(200).sendFile(path.join(rootDir, 'views-html', 'register.html'));
//     }
//     else{

//     }
// });

router.get('/users/register', (req, res, next) => {
    res.status(200).sendFile(path.join(rootDir, 'views-html', 'register.html'));
});

router.post('/users/register', (req, res, next) => {});

module.exports = router;