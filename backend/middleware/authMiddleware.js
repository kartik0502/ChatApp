const jwt = require('jsonwebtoken');

module.exports.authMiddleware = async (req, res, next) => {
    const { authToken } = req.cookies;

    if (!authToken) {
        return res.status(401).json({
            error : {
                errorMessage : ['Unauthorized']
            }
        });
    }
    else {
        const decodeToken = await jwt.verify(authToken, process.env.JWT_SECRET);
        req.myId = decodeToken.id;
        next();
    }
};