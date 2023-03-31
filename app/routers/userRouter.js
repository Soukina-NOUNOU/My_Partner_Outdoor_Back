const express = require('express');
const userController = require ('../controllers/userController');
const {catchErrors} = require('../middlewares/handlers/errorHandlers')
const router = express.Router();

/**
 * a category type of User
 * 
 * @typedef User
 * @property {integer} id - user id
 * @property {text} firstname - user firstname
 * @property {text} lastname - user lastname
 * @property {text} email - user email
 * @property {text} password - user password
 * @property {text} pseudo - user pseudo
 * @property {text} picture - user picture
 * @property {text} birthday - user birthday
 * @property {text} bio - user label
 * @property {timestampz} created_at - date of creation
 * @property {timestampz} updated_at - date of last update
 * 
 */


/**
 * Shows a User by its id
 * @route GET /user/{id}
 * @group User - Operations about user profil
 * @param {integer} id.path.required - User ID - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/:id', catchErrors(userController.getOne));

/**
 * Create a User
 * @route POST /user
 * @group User - Operations about user
 * @param {Post.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday & bio
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/', catchErrors(userController.create));

/**
 * Modify a User by its id
 * @route patch /user/{id}
 * @group User - Operations about user profil
 * @param {integer} id.path.required - User ID - User ID
 * @param {Post.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday & bio
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.patch('/:id', catchErrors(userController.mofify));

/**
 * Delete a User
 * @route DELETE /user
 * @group User - Operations about user
 * @param {integer} id.path.required - User ID - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.delete('/:id', catchErrors(userController.delete));

module.exports = router;