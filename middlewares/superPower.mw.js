const {SuperPower} = require('../models');

async function superPowerParse (SPK) {
    const power = await SuperPower.findOne({
        where:{
            superPowerKind: SPK
        }
    });
    
    if (!power) {      
        const powerbody={superPowerKind: SPK};   
        const createdpower = await SuperPower.create(powerbody);
        //console.log('NEW POWER IS ', createdpower);              
        return createdpower;
    }
    else {
       // console.log('OLD POWER IS ', power);   
        return power;
    }
}

module.exports.getPowerInstance = async (req, res, next) => {
    try {
        const {body: {superPowerKind}} = req;
        const resultPowerArray=[];

        if (typeof superPowerKind === 'string'){
            const power= await superPowerParse(superPowerKind);
            resultPowerArray.push(power);
        }
        else if (Array.isArray(superPowerKind)) {
            for (let spk of superPowerKind){
                const power = await superPowerParse(spk);
                resultPowerArray.push(power);
            };
        }
        req.powerInstanceArray = resultPowerArray;
        next(); 
    } catch(error) {
        next(error);
    }
}
