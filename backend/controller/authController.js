const bcrypt = require('bcrypt');

const authrepository = require('../repository/authRepository');
const { generateToken } = require('../utils/jwt');

const User = require('../module/userModel');

exports.registeruser = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        if (!name || !email || !password || !phone) {
            return res.status(400).json({ success: false, message: 'all fields are required' });
        }

        const existinguser = await authrepository.getUserByEmail(email);
        if (existinguser) {
            return res.status(400).json({ success: false, message: 'user already exist' });
        }

        const hashpassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashpassword,
            phone
        });
        await newUser.save();

        res.status(201).json({ success: true, message: 'user created successfully', user: newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'internal server error' });
    }
};

exports.loginuser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'all fields are required' });
        }

        const user = await authrepository.getUserByEmail(email);
        if (!user) {
            return res.status(400).json({ success: false, message: 'invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'invalid credentials' });
        }

        const payload = { id: user._id, email: user.email, name: user.name };
        const token = generateToken(payload);

        return res.status(200).json({ success: true, message: 'login successful', user, token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'internal server error' });
    }
};
