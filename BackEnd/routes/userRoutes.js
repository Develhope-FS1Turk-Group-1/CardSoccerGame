const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/getUsername/:userId', userController.getUsername);

router.put('/updatePassword', userController.updatePassword);

module.exports = router;
