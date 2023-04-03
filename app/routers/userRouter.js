const express = require('express');
const userController = require ('../controllers/userController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');

const router = express.Router();

/**
 * Shows a user by its id
 * @route GET /user/{id}
 * @group User - Operations about user
 * @param {integer} id.path.required - User ID - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/:id', catchErrors(userController.getOne));



module.exports = router;