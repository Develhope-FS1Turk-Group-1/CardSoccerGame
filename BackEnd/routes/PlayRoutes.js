const express = require('express');
const router = express.Router();
const PlayController = require('../controllers/PlayController.js');

router.get('/getTeams/:league', PlayController.getTeams);
router.get('/getLeagues', PlayController.getLeagues);
router.post('/playSingle/:team/:userId', PlayController.playSingleMatch);
router.post('/playOnline',PlayController.playOnlineMatch);
router.post('/addMatchHistory', PlayController.addMatchHistory);
router.post('/history/:userId', PlayController.getMatchHistoryById);
router.get('/rank', PlayController.getAllUsersTeamPowerAndSort);


module.exports = router;
