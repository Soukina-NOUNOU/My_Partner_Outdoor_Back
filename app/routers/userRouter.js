const express = require('express');
const userController = require ('../controllers/userController');
const upload = require('../middlewares/multer');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const validate = require('../middlewares/validation/validation');
const { checkParamsId } = require ('../middlewares/checkParams');
const { checkJWT } = require('../middlewares/security');
const { post: postSchema, path: patchSchema ,get: getSchema } = require('../middlewares/validation/schema/user');
const router = express.Router();


/**
 * Models type of UserPost
 * @typedef UserPost
 * @property {string} firstname - James
 * @property {string} lastname - Dean
 * @property {string} email - jamesdean@gmail.com
 * @property {string} password - P@SSW0RD!
 * @property {string} repeat_password - P@SSW0RD!
 * @property {string} pseudo - JD
 * @property {string} sport - Football
 */

/**
 * Models type of UserPatch
 * @typedef UserPath
 * @property {string} firstname - James
 * @property {string} lastname - Dean
 * @property {string} email - jamesdean@gmail.com
 * @property {string} password - P@SSW0RD!
 * @property {string} pseudo - JD
 * @property {string} picture - My user picture
 * @property {string} birthday - 01/01/1980
 * @property {string} bio - My biography
 * @property {string} number - 125
 * @property {string} street - avenue du Général de Gaulle
 * @property {string} zip_code - 75001
 * @property {string} city - Paris
 * @property {string} sport - Football
 */

/**
 * Models type of UserLogin
 * @typedef UserLogin
 * @property {string} email - jamesdean@gmail.com
 * @property {string} password - P@SSW0RD!
 */


/**
 * Delete sport of user
 * @route DELETE /user/{id}/sport/{sportid}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @param {integer} sportid.path.required - sport_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id or sport_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.delete('/:id/sport/:sportid', checkParamsId, catchErrors(userController.deleteSport));

/**
 * Add sport to user by user_id and sport_id
 * @route POST /user/{id}/sport/{sportid}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @param {integer} sportid.path.required - sport_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id or sport_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.post('/:id/sport/:sportid', checkParamsId, catchErrors(userController.createUserHasSport));

/**
 * Delete addres of user
 * @route DELETE /user/{id}/address/{addressid}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @param {integer} addressid.path.required - address_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request  "user_id or address_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.delete('/:id/address/:addressid', checkParamsId, catchErrors(userController.deleteAddress));

/**
 * Retunr all events of user
 * @route GET /user/{id}/events
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/
router.get('/:id/events', checkParamsId, catchErrors(userController.getUserHasEvents));

/**
 * Return a user address by user_id
 * @route GET /user/{id}/address
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/
router.get('/:id/address', checkParamsId, catchErrors(userController.getUserHasAddress));

/**
 * Return a user sport by user_id
 * @route GET /user/{id}/sports
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
*/
router.get('/:id/sports', checkParamsId, catchErrors(userController.getUsersport));

// Upload image
router.patch('/:id/upload', upload.single('picture'), catchErrors(userController.modify));

/**
 * Create a user
 * @route POST /user/login
 * @group User - Operations about user
 * @param {UserLogin.model} data.body.required - email, password
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.post('/login', catchErrors(userController.login));

/**
 * Return a user by its id
 * @route GET /user/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id invalid"
 * @returns {Error} 404 - Page not found 
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
 router.get('/:id', checkJWT, checkParamsId, validate(getSchema, 'params'), catchErrors(userController.getOne));

/**

 * Modify a user
 * @route patch /user/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @param {UserPath.model} data.body.required - firstname, lastname, email, password, pseudo, picture, birthday, bio, number, street, zip_code, city, sport
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id or data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.patch('/:id', checkParamsId, validate(patchSchema, 'body'), catchErrors(userController.modify));

/**
 * Delete a User
 * @route DELETE /user/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.delete('/:id', checkParamsId, catchErrors(userController.delete));

/**
 * Create user
 * @route POST /user
 * @group User - Operations about user
 * @param {UserPost.model} data.body.required - firstname, lastname, email, password, repeat_password, pseudo, sport
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.post('/', validate(postSchema, 'body'), catchErrors(userController.create));

module.exports = router;