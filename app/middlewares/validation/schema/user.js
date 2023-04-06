const Joi = require('joi');

const schemas = {
    post: Joi.object({
        //data validation for route creation (for route post user)
        firstname: Joi.string().required(), //first name is required and it must be a character string
        lastname: Joi.string().required(), //last name is required and it must be a character string
        email: Joi.string().pattern(/^([a-zA-Z0-9.\-_]{1,64}@[a-zA-Z0-9]+\.[a-zA-Z]{1,63}){1,255}$/).required(), //email is required, must be a character string and must respect: - between 1 and 64 characters can include numbers, as well as dashes - must include an @ - must include numbers and/or letters - must include a period and end with letters between 1 and 64 characters and all this must not exceed 255 characters
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required(), //password must include: an uppercase letter, a lowercase letter, a special character, a number and all this must include 8 characters
        repeat_password: Joi.ref('password'), //repeat password
        pseudo: Joi.string().required(), //pseudo is required and it must be a character string
        birthday: Joi.string().pattern(/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/).optional(), //birthday is optional but must respect a specific format: (12/12/2012)
        picture: Joi.string().optional(), //adding picture is optional
        bio: Joi.string().max(500).allow('').optional(), //biographie is optional and must not exceed 500 characters
        sport: Joi.string().required() //adding sport is require
    }).required(),
    path: Joi.object({
        //data validation for route modify (for route patch event)
        firstname: Joi.string().optional(), //changing first name is optional
        lastname: Joi.string().optional(), //changing last name is optional
        email: Joi.string().pattern(/^([a-zA-Z0-9.\-_]{1,64}@[a-zA-Z0-9]+\.[a-zA-Z]{1,63}){1,255}$/).optional(), // changing email is optional but you have to respect a precise format (conf: data validation for route creation)
        password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).optional(), //changing password is optional but you have to respect a precise format (conf: data validation for route creation)
        old_password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).optional(),
        repeat_password: Joi.ref('password'),// repeat password
        pseudo: Joi.string().optional(), //changing pseudo is optional
        picture: Joi.string().optional(), //changing picture is optional 
        birthday: Joi.string().pattern(/^[0-9]{2}[\/][0-9]{2}[\/][0-9]{4}$/).optional(),//birthday is optional but must respect a specific format: (12/12/2012)
        bio: Joi.string().max(500).allow('').optional(),  // The biographie is optional and must not exceed 500 characters
        number: Joi.number().integer().optional(), //changing number is optional
        street: Joi.string().optional(), //changing street is optional
        zip_code: Joi.string().pattern(/^\d{5}$/).message('zip_code required five number').optional(), //zip_code is optional but must respect a specific format: (35000)
        city: Joi.string().optional() //changing city is optional
    }),
    get: Joi.object({
        id: Joi.number().integer().required()
    }).required()
};

module.exports = schemas;
