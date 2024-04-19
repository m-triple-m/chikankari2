const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {

    // get the token from the request header
    const token = req.header('x-auth-token');
    // Check if no token
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }
    // verify token
    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, userInfo) => {
            if (err){
                console.error(err);
                res.status(401).json({ msg: 'Token is not valid' });
            }else{
                req.user = userInfo;
                next();
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Server Error' });
    }

}
module.exports = verifyToken;