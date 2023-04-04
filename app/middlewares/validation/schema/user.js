const Joi = require('joi');

const schemas = {
    post: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        repeat_password: Joi.ref('password'),
        pseudo: Joi.string().required(),
        birthday: Joi.number().integer().min(1900).max(2013).optional(),
        picture: Joi.string().optional(),
        bio: Joi.string().max(500).allow('').optional(),
        sport: Joi.string().required()
    }).required(),
    path: Joi.object({
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
        email: Joi.string().email().optional(),
        password: Joi.string().min(8).optional(),
        repeat_password: Joi.ref('password'),
        pseudo: Joi.string().optional(),
        picture: Joi.string().optional(),
        birthday: Joi.number().integer().min(1900).max(2013).optional(),
        bio: Joi.string().max(500).allow('').optional(),
        number: Joi.number().integer().optional(),
        street: Joi.string().optional(),
        zip_code: Joi.number().integer().optional(),
        city: Joi.string().optional()
    }),
    get: Joi.object({
        id: Joi.number().integer().required()
    }).required()
};

module.exports = schemas;


// const Joi = require('joi');

// const schemas = {
//   post: Joi.object({
//     firstname: Joi.string().required(),
//     lastname: Joi.string().required(),
//     email: Joi.string().email().required(),
//     password: Joi.string().min(8).required(),
//     repeat_password: Joi.ref('password'),
//     pseudo: Joi.string().required(),
//     picture: Joi.string().optional(),
//     birthday: Joi.number().integer().min(1900).max(2013),
//     bio: Joi.string().max(500).allow('').optional()
//   }).required()
// };
// console.log(schemas);

// module.exports = schemas;