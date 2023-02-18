const {SuperHero, SuperPower, HeroImage} = require('../models');

module.exports.createSuperHero = async (req, res, next) => {
    try{
        const {body, powerInstanceArray} = req;   
        const existedHero = await SuperHero.findOne({
            where: {
                nickName: body.nickName
            }
        });        
        
        if (existedHero) {
            return res.status(208).send(`SuperHero with such nickName ("${body.nickName}") - already exist`);  
        } else {
            const createdHero = await SuperHero.create(body);
            const result = await createdHero.addSuperPowers(powerInstanceArray);   
            const heroWithPowers = await SuperHero.findByPk(createdHero.id, { 
                attributes:{
                        exclude: ['createdAt', 'updatedAt']
                },
                include: [SuperPower]
            });     
            return res.status(201).send(heroWithPowers);   
        } 

    } catch (error) {
        next(error)
    }
}


module.exports.addSuperHeroImage = async(req, res, next) => {
    try {
        const {heroInstance, files} = req;
  
        for (let f of files){
            await heroInstance.createHeroImage ({
                imagePath: f.filename
            });
        }

        const heroWithImages = await SuperHero.findByPk(heroInstance.id, { 
                attributes:{
                        exclude: ['createdAt', 'updatedAt']
                },
                include: [HeroImage]
            });    
        return res.status(201).send(heroWithImages); 
        
    } catch (error) {
        next(error)
    }
}


module.exports.findAllSuperHeros = async (req, res, next) => {
    try {
        const {pagination} = req;
        const results = await SuperHero.findAll({
            ...pagination,
            attributes:{
                exclude: ['createdAt', 'updatedAt']
            },
            include: [SuperPower, HeroImage]
        });
        return res.status(200).send(results);
    } catch(error) {
        next(error);
    }
}

module.exports.findOneSuperHeroByPk = async (req, res, next) => {
    try { 
        const {heroInstance} = req;
        return res.status(200).send(heroInstance);
    } catch(error) {
        next(error)
    }
}

module.exports.deleteSuperHeroByPK = async (req, res, next) => {
    try {
        const {heroInstance} = req;
        const deletedRowsCount = await heroInstance.destroy();
        if (deletedRowsCount){
            return res.status(200).send(`SuperHero with ID ${heroInstance.id} - "${heroInstance.nickName}" successfully deleted`);
        } else{
            return res.status(204).send('No such SuperHero');
        }
    } catch(error) {
        next(error)
    }
}

module.exports.updateSuperHero = async (req, res, next) => {
    try {
        const {body, heroInstance, powerInstanceArray} = req;
        await heroInstance.update(body);

            //adding powers if not exist
            for( let powerInstance of powerInstanceArray)
            {   const existPowerForHero = await heroInstance.hasSuperPower(powerInstance);             
                if (!existPowerForHero){
                    await heroInstance.addSuperPower(powerInstance);
                }
            }

            //deleting "waste" powers 
            const existHeroPowers = await heroInstance.getSuperPowers();                     

            for ( let existpowerInstance of existHeroPowers ) {   
                let existPower=false;
                for ( let powerInstance of powerInstanceArray ) {
                    console.log(existpowerInstance.id, "--", powerInstance.id);
                    if ( existpowerInstance.id === powerInstance.id ) {
                        existPower=true;
                        break;
                    }
                }
                if (!existPower) {
                    const rowCount = await heroInstance.removeSuperPower(existpowerInstance);
                }
            }

                                   
        const heroWithPowers = await SuperHero.findByPk(heroInstance.id, { 
            attributes:{
                    exclude: ['createdAt', 'updatedAt']
            },
            include: [SuperPower]
        }); 
                 
        return res.status(200).send(heroWithPowers);
    } catch(error) {
        next(error)
    }
}
