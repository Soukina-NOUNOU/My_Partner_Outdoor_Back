const Joi = require('joi');

const schemas = {
    post: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().pattern(/^([a-zA-Z0-9.\-_]{1,64}@[a-zA-Z0-9]+\.[a-zA-Z]{1,63}){1,255}$/).required(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(),
        repeat_password: Joi.ref('password'),
        pseudo: Joi.string().required(),
        birthday: Joi.string().pattern(/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/).optional(),
        picture: Joi.string().optional(),
        bio: Joi.string().max(500).allow('').optional(),
        sport: Joi.string().required()
    }).required(),
    path: Joi.object({
        firstname: Joi.string().optional(),
        lastname: Joi.string().optional(),
        email: Joi.string().pattern(/^([a-zA-Z0-9.\-_]{1,64}@[a-zA-Z0-9]+\.[a-zA-Z]{1,63}){1,255}$/).optional(),
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).optional(),
        repeat_password: Joi.ref('password'),
        pseudo: Joi.string().optional(),
        picture: Joi.string().optional(),
        birthday: Joi.string().pattern(/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/).optional(),
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