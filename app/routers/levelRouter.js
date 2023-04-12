const express = require('express');
const levelController = require ('../controllers/levelController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const router = express.Router();

/**
 * Return all levels
 * @route GET /level
 * @group Level - Operations about level
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/', catchErrors(levelController.getAll));

module.exports = router;