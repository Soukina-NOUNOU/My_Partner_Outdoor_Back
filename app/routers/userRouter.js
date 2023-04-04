const express = require('express');
const userController = require ('../controllers/userController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const router = express.Router();


/**
 * Models type of User
 * @typedef User
 * @property {string} firstname - James
 * @property {string} lastname - Dean
 * @property {string} email - jd.mail.fr
 * @property {string} password - 1234
 * @property {string} pseudo - JD
 * @property {string} picture - user picture
 * @property {string} birthday - 01/01/1980
 * @property {string} bio - Lorem ipsum
 * 
 */

router.get('/login', (req, res) => {
  res.render('login');
});
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
router.get('/:id', catchErrors(userController.getOne));

/**
 * Modify a User by its id
 * @route patch /user/{id}
 * @group User - Operations about user profil
 * @param {integer} id.path.required - User ID 
 * @param {User.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday, bio
 * @returns {object} 200 - An object with "result" user modify
 * @returns {Error} 400 - Bad request "user id or data is invalid"
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.patch('/:id', catchErrors(userController.mofify));

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
 * @param {User.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday, bio
 * @returns {object} 200 - An object with "result" user create
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/', catchErrors(userController.create));

module.exports = router;