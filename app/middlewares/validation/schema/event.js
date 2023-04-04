const Joi = require('joi');

const schemas = {
    post: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().optional(),
        start: Joi.date().optional(),
        finish: Joi.date().optional(),
        nb_participant: Joi.number().integer().required(),
        equipement: Joi.string(),
        price: Joi.number().optional(),
        picture: Joi.string(),
        organizer_id: Joi.number().integer().required(),
        number: Joi.number().integer().required(),
        street: Joi.string().required(),
        zip_code: Joi.number().integer().required(),
        city: Joi.string().required(),
        sport: Joi.string().required(),
        level: Joi.string().required()
    }).required(),
    path: Joi.object({
        firstname: Joi.string(),
        lastname: Joi.string(),
        email: Joi.string().email(),
        password: Joi.string(),
        pseudo: Joi.number().integer(),
        picture: Joi.string(),
        birthday: Joi.string(),
        bio: Joi.string()
    }),
    get: Joi.object({
        id: Joi.number().integer().required()
    }).required()
};

module.exports = schemas;