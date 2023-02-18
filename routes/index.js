const {Router} = require('express');

const superHeroesRouter = require('./heroesRouter');
const superPowersRouter = require('./powersRouter');

const router = Router();

router.use('/heroes', superHeroesRouter);
router.use('/powers', superPowersRouter);

module.exports = router;