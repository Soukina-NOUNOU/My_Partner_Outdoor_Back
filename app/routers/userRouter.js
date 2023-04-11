const express = require('express');
const userController = require ('../controllers/userController');
const upload = require('../utils/multer');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const validate = require('../middlewares/validation/validation');
<<<<<<< HEAD
const { post: postSchema, path: patchSchema ,get: paramsSchema } = require('../middlewares/validation/schema/user');
=======
const { checkParamsId } = require ('../middlewares/checkParams');
const { checkJWT } = require('../middlewares/security');
const { post: postSchema, path: patchSchema ,get: getSchema } = require('../middlewares/validation/schema/user');
>>>>>>> eb6fb2e1f233653e9799cbb06e2a9616f6906eab
const router = express.Router();


/**
 * Models type of User
 * @typedef UserPost
 * @property {string} firstname - James
 * @property {string} lastname - Dean
 * @property {string} email - jd.mail.fr
 * @property {string} password - 1234
 * @property {string} repeat_password - 1234
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

/**
 * Models type of UserLogin
 * @typedef UserLogin
 * @property {string} email - jd.mail.fr
 * @property {string} password - 1234
 * 
 */


/**
 * Delete sport of user
 * @route DELETE /user/{id}/sport/{sportid}
 * @group User - Operations about user
 * @param {integer} id.path.required - Usert ID - User ID
 * @param {integer} sportid.path.required - sport ID - sport ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.delete('/:id/sport/:sportid', checkParamsId, catchErrors(userController.deleteSport));

/**
 * Add sport for user by user id and sport id
 * @route POST /user/{id}/sport/{sportid}
 * @group User - Operations about user
 * @param {integer} id.path.required - User ID - User ID
 * @param {integer} sportid.path.required - Sport ID - Sport ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/:id/sport/:sportid', checkParamsId, catchErrors(userController.createUserHasSport));

/**
 * Delete addres of user
 * @route DELETE /user/{id}/address/{addressid}
 * @group User - Operations about user
 * @param {integer} id.path.required - Usert ID - User ID
 * @param {integer} addressid.path.required - Address ID - Address ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.delete('/:id/address/:addressid', checkParamsId, catchErrors(userController.deleteAddress));

/**
 * Shows a User's Events by User ID
 * @route GET /user/{id}/events
 * @group User - Operations about user profile
 * @param {integer} id.path.required - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user id or data is invalid"
 * @returns {Error} 404 - Page not found "user address was not found"
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
*/
<<<<<<< HEAD
router.get('/:id/events', validate( paramsSchema, 'params'), catchErrors(userController.getUserHasEvents));
=======
router.get('/:id/events', checkParamsId, catchErrors(userController.getUserHasEvents));
>>>>>>> eb6fb2e1f233653e9799cbb06e2a9616f6906eab

/**
 * Shows a User's Address by User ID
 * @route GET /user/{id}/address
 * @group User - Operations about user profile
 * @param {integer} id.path.required - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user id or data is invalid"
 * @returns {Error} 404 - Page not found "user address was not found"
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
*/
router.get('/:id/address', checkParamsId, catchErrors(userController.getUserHasAddress));

/**
 * Shows a User's Sport by User ID
 * @route GET /user/{id}/sports
 * @group User - Operations about user profile
 * @param {integer} id.path.required - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "user id or data is invalid"
 * @returns {Error} 404 - Page not found "user address was not found"
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
*/
router.get('/:id/sports', checkParamsId, catchErrors(userController.getUsersport));

/**
 * Create a User
 * @route POST /user/login
 * @group User - Operations about userLogin
 * @param {UserLogin.model} data.body.required - email, password
 * @returns {object} 200 - An object with "result" user login
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
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
<<<<<<< HEAD
 router.get('/:id', catchErrors(userController.getOne));
=======
 router.get('/:id', checkJWT, checkParamsId, validate(getSchema, 'params'), catchErrors(userController.getOne));
>>>>>>> eb6fb2e1f233653e9799cbb06e2a9616f6906eab

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
<<<<<<< HEAD
router.patch('/:id', validate(patchSchema, 'body'), upload.single('picture') , catchErrors(userController.modify));
=======
router.patch('/:id', checkParamsId, validate(patchSchema, 'body'), catchErrors(userController.modify));
>>>>>>> eb6fb2e1f233653e9799cbb06e2a9616f6906eab

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
router.delete('/:id', checkParamsId, catchErrors(userController.delete));

/**
 * Create a User
 * @route POST /user
 * @group User - Operations about user
 * @param {UserPost.model} data.body.required - firstname, lastname, email, password, repeat_password, pseudo, picture, birthday, bio
 * @returns {object} 200 - An object with "result" user create
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found "user was not found"
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/', validate(postSchema, 'body'), catchErrors(userController.create));

module.exports = router;