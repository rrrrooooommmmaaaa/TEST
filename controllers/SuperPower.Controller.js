const {SuperPower} = require("../models");


module.exports.createSuperPower = async(req, res,next) =>{
    try{
        const {body} = req; 
        const created = await SuperPower.create(body);
        return res.status(201).send(created);
    } catch(error) {
        next(error)
    }
}

