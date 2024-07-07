const { verifyToken } = require('../utils/jwtUtils');

function authenticateToken(req, res, next) {
    console.log(req);
    console.log("cookies", req.cookies); 
    const token = req.cookies.token;
    if (!token) return res.sendStatus(401);
    const decoded = verifyToken(token);
    if (!decoded) return res.sendStatus(403);
    req.user = decoded;
    next();
}

module.exports = authenticateToken;
