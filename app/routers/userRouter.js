const express = require('express');
const userController = require ('../controllers/userController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const validate = require('../middlewares/validation/validation');
const { post: postSchema, get: getSchema } = require('../middlewares/validation/schema/user');
const router = express.Router();


/**
 * Models type of User
 * @typedef UserPost
 * @property {string} firstname - James
 * @property {string} lastname - Dean
 * @property {string} email - jd.mail.fr
 * @property {string} password - 1234
 * @property {string} pseudo - JD
 * @property {string} sport - sport
 * 
 */

/**
 * Models type of User
 * @typedef UserPath
 * @property {string} firstname - James
 * @property {string} lastname - Dean
 * @property {string} email - jd.mail.fr
 * @property {string} password - 1234
 * @property {string} pseudo - JD
 * @property {string} picture - user picture
 * @property {string} birthday - 01/01/1980
 * @property {string} bio - Lorem ipsum
 * @property {string} number - address number
 * @property {string} street - address street
 * @property {string} zip_code - address zip_code
 * @property {string} city - address city
 * @property {string} sport - sport
 * 
 */


router.post('/login', catchErrors(userController.login));


/**
 * Shows a User by its id
 * @route GET /user/{id}
 * @group User - Operations about user profil
 * @param {integer} id.path.required - User ID 
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user id or data is invalid"
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
 router.get('/:id', validate(getSchema, 'params'), catchErrors(userController.getOne));

/**
 * Modify a User by its id
 * @route patch /user/{id}
 * @group User - Operations about user profil
 * @param {integer} id.path.required - User ID 
 * @param {UserPath.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday, bio
 * @returns {object} 200 - An object with "result" user modify
 * @returns {Error} 400 - Bad request "user id or data is invalid"
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.patch('/:id', catchErrors(userController.modify));

/**
 * Delete a User
 * @route DELETE /user/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - User ID 
 * @returns {object} 200 - An object with "result" user delete
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.delete('/:id', catchErrors(userController.delete));

/**
 * Create a User
 * @route POST /user
 * @group User - Operations about user
 * @param {UserPost.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday, bio
 * @returns {object} 200 - An object with "result" user create
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/', validate(postSchema, 'body'), catchErrors(userController.create));

module.exports = router;