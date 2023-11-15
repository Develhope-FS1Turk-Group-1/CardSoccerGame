const { CronJob } = require('cron');
const userController = require('../controllers/userController');

const updateCountdownTimers = new CronJob('0 0 * * * *', () => {
  userController.updateCountupPowers();
});

updateCountdownTimers.start();
