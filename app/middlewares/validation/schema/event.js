const Joi = require('joi');

const schemas = {
    post: Joi.object({
        //data validation for route creation (route post event)
        title: Joi.string().required(), //title is required and it must be a character string
        description: Joi.string().required(), //description is required and it must be a character string
        start_date: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message('require this format: aaaa-mm-jj').required(), //the start date event is required with this format: four-digit year, month from 01 to 12 and day from 01 to 31
        finish_date: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message('require this format: aaaa-mm-jj').required(), //the end date event is required with this format: four-digit year, month from 01 to 12 and day from 01 to 31
        start_hour: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).message('hour require this format: hh:mm with valid time').required(), //the start hour event is required with this format: hour from 00 to 23 and minutes from 00 to 59 including ":" between hour and minutes
        finish_hour: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).message('hour require this format: hh:mm with valid time').required(), //the end event hour is required with this format: hour from 00 to 23 and minutes from 00 to 59 including ":" between hour and minutes 
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
        start_date: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message('require this format: aaaa-mm-jj').optional(), //the start date event is required with this format: four-digit year, month from 01 to 12 and day from 01 to 31
        finish_date: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/).message('require this format: aaaa-mm-jj').optional(), //the end date event is required with this format: four-digit year, month from 01 to 12 and day from 01 to 31
        start_hour: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).message('hour require this format: hh:mm with valid time').optional(), //the start hour event is required with this format: hour from 00 to 23 and minutes from 00 to 59 including ":" between hour and minutes
        finish_hour: Joi.string().pattern(/^(0[0-9]|1[0-9]|2[0-3]):([0-5][0-9])$/).message('hour require this format: hh:mm with valid time').optional(), //the end event hour is required with this format: hour from 00 to 23 and minutes from 00 to 59 including ":" between hour and minutes 
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