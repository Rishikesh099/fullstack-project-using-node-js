const jwt = require('jsonwebtoken');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../.env') });
const SECRET = process.env.JWT_SECRET_KEY;

if (!SECRET) {
    throw new Error('JWT_SECRET_KEY is not set in environment. Set it in backend/.env');
}

exports.generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: '1d' });
};

exports.verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};