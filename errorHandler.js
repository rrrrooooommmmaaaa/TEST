const SuperHeroError = require('./errors/SuperHeroError');

module.exports.errorHandler = (err, req, res, next) => {   
    if (err instanceof SuperHeroError) {
        return res.status(404).send(err.message)
    }        

     return res.status(500).send(err.message);
}