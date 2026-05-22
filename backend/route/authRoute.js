const express = require('express');

const router = express.Router();

const userController = require('../controller/authController');

// register route
router.post('/register', userController.registeruser);
router.post('/login', userController.loginuser);

module.exports = router;
