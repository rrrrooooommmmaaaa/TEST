const {SuperHero, SuperPower, HeroImage} = require('../models');
const SuperHeroError = require('../errors/SuperHeroError');


module.exports.getHeroInstance = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await SuperHero.findByPk(heroId, {
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            },
            include: [SuperPower, HeroImage]            
        });
        
        if (!hero) {
            throw new SuperHeroError('SuperHero not found!');
        }
        req.heroInstance = hero;
        next(); 
    } catch(error) {
        next(error);
    }
}
