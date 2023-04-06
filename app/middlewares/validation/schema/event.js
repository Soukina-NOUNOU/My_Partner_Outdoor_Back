const Joi = require('joi');

const schemas = {
    post: Joi.object({
        //data validation for route creation (route post event)
        title: Joi.string().required(), //title is required and it must be a character string
        description: Joi.string().required(), //description is required and it must be a character string
        start: Joi.date().required(), //the start event is required and it must be a character string
        finish: Joi.date().required(), //the end event is required and it must be a character string
        nb_participant: Joi.number().integer().required(), //number participants is required and it must be a number
        equipement: Joi.string().optional(), //equipement is optional and it must be a character string
        price: Joi.number().optional(), //price is optional and it must be a number
        picture: Joi.string().optional(), //picture is optional and it must be a character string
        organizer_id: Joi.number().integer().required(), //organizer is required and it must be a number
        number: Joi.number().integer().required(), //number is required and it must be a number
        street: Joi.string().required(), //street is required and it must be a character string
        zip_code: Joi.string().pattern(/^\d{5}$/).message('zip_code required five number').required(), //zip_code is required but must respect a specific format: (35000)
        city: Joi.string().required(), //city is required and it must be a character string
        sport: Joi.string().required(), //sport is required and it must be a character string
        level: Joi.string().required() //level is required and it must be a character string
    }).required(),
    path: Joi.object({
        //data validation for route creation (route patch event)
        title: Joi.string().optional(), //title is optional and it must be a character string
        description: Joi.string().optional(), //description is optional and it must be a character string
        start: Joi.date().optional(), //the start event is optional and it must be a character string
        finish: Joi.date().optional(),//the end event is optional and it must be a character string
        nb_participant: Joi.number().integer().optional(), //number participants is optional and it must be a number
        equipement: Joi.string().optional(), //equipement is optional and it must be a character string
        price: Joi.number().optional(),//price is optional and it must be a number
        picture: Joi.string().optional(), //picture is optional and it must be a character string
        organizer_id: Joi.number().integer().optional(), //organizer is optional and it must be a number
        number: Joi.number().integer().optional(),//number is optional and it must be a number
        street: Joi.string().optional(), //street is optional and it must be a character string
        zip_code: Joi.string().pattern(/^\d{5}$/).message('zip_code required five number').optional(),//zip_code is optional but must respect a specific format: (35000)
        city: Joi.string().optional(), //city is optional and it must be a character string
        sport: Joi.string().optional(),//sport is optional and it must be a character string
        level: Joi.string().optional() //level is optional and it must be a character string
    }),
    get: Joi.object({
        id: Joi.number().integer().message('require a number').required()
    }).required()
};

module.exports = schemas;