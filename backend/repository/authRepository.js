const User = require('../module/userModel');

exports.getUserByEmail = async (email) => {
    return User.findOne({ email });
};

exports.createUser = async (userData) => {
    return User.create(userData);
};