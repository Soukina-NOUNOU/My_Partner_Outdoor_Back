const APIError = require('./handlers/APIError');

module.exports = {
    checkParamsId (req, res, next) {
        // All params to check
        const fields = ['id', 'sportid', 'addressid', 'userid', 'messageid'];

        // We valide if is a number
        for(const field of fields) {
            if(req.params[field]) {
                const id = parseInt(req.params[field], 10);
                if(isNaN(id)) {
                    const err = new APIError ('Bad request', 400)
                    return next(err);
                } else {
                    req.params[field] = id;
                }
            }
        }
        next();
    }
};
