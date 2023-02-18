const {Router} = require('express');
const multer = require('multer');
const path = require('path');

const SuperHeroController = require('../controllers/SuperHero.Controller');
const {getHeroInstance} = require('../middlewares/superHero.mw');
const {getPowerInstance} = require('../middlewares/superPower.mw');
const {STATIC_PATH} = require('../config/path.config');

const pagination = require('../middlewares/pagination.mw');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, STATIC_PATH)
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.${file.originalname}`)
    }
});
  
const upload = multer({storage});

const superHeroesRouter = Router();

superHeroesRouter.post('/', getPowerInstance, SuperHeroController.createSuperHero); 
superHeroesRouter.get('/', pagination, SuperHeroController.findAllSuperHeros);
superHeroesRouter.get('/:heroId', getHeroInstance, SuperHeroController.findOneSuperHeroByPk);
superHeroesRouter.delete('/:heroId', getHeroInstance, SuperHeroController.deleteSuperHeroByPK);
superHeroesRouter.put('/:heroId', getHeroInstance, getPowerInstance, SuperHeroController.updateSuperHero);
superHeroesRouter.put('/image/:heroId',upload.array('heroimages',5), getHeroInstance, SuperHeroController.addSuperHeroImage);

module.exports = superHeroesRouter;