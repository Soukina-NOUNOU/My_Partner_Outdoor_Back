const Joi = require('joi');

const schemas = {
    post: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        start: Joi.date().required(),
        finish: Joi.date().required(),
        nb_participant: Joi.number().integer().required(),
        equipement: Joi.string().optional(),
        price: Joi.number().optional(),
        picture: Joi.string().optional(),
        organizer_id: Joi.number().integer().required(),
        number: Joi.number().integer().required(),
        street: Joi.string().required(),
        zip_code: Joi.string().pattern(/^\d{5}$/).message('zip_code required five number').required(),
        city: Joi.string().required(),
        sport: Joi.string().required(),
        level: Joi.string().required()
    }).required(),
    path: Joi.object({
        title: Joi.string().optional(),
        description: Joi.string().optional(),
        start: Joi.date().optional(),
        finish: Joi.date().optional(),
        nb_participant: Joi.number().integer().optional(),
        equipement: Joi.string().optional(),
        price: Joi.number().optional(),
        picture: Joi.string().optional(),
        organizer_id: Joi.number().integer().optional(),
        number: Joi.number().integer().optional(),
        street: Joi.string().optional(),
        zip_code: Joi.string().pattern(/^\d{5}$/).message('zip_code required five number').optional(),
        city: Joi.string().optional(),
        sport: Joi.string().optional(),
        level: Joi.string().optional()
    }),
    get: Joi.object({
        id: Joi.number().integer().message('require a number').required()
    }).required()
};

module.exports = schemas;