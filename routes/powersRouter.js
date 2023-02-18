const {Router} = require('express');
const SuperPowerController = require('../controllers/SuperPower.Controller');

const superPowersRouter = Router();

superPowersRouter.post('/', SuperPowerController.createSuperPower); 

module.exports = superPowersRouter;