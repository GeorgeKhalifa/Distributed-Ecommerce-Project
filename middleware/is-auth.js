const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try{
        console.log(token);
        decodedToken = jwt.verify(token, 'secret');
    } catch(err) {
        throw err;
    }
    req.user = decodedToken.user;
    next();
};