const APIError = require('../handlers/APIError');

function validate(schema, dataSource) {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req[dataSource]);
            next();
        } catch (err) {
            const error = new APIError (err.details[0].message, 400);
            next(error);
        }
    }
};

module.exports = validate;

