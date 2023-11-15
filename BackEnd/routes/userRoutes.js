const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/getUsername/:userId', userController.getUsername);

router.put('/updatePassword', userController.updatePassword);

router.post('/randomplayer', userController.randomPlayer);

router.post('/updateCountdownPowers', userController.updateCountdownPowers);

router.post('/passwordReset', userController.sendUserResetPassword);

router.post('/reset-password', userController.resetPassword);

router.get('/reset-password/:resetToken', (req, res) => {
  const { resetToken } = req.params;
  res.render('reset-password', { resetToken });
});

router.get('/activate/:token', async (req, res) => {
    const { token } = req.params;
    try {
      const result = await userController.activateUser(token);
  
      if (result.success) {
        res.send('Account activated successfully!');
      } else {
        res.status(400).send('Invalid activation token');
      }
    } catch (error) {
      console.error('Error activating user', error);
      res.status(500).send('Internal Server Error');
    }
});
  


module.exports = router;
