const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/config');

function generateToken(user) {
    return jwt.sign({ id: user.userCode, username: user.username, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (err) {
        return null;
    }
}

module.exports = { generateToken, verifyToken };
