const express = require('express');
const sportController = require ('../controllers/sportController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const router = express.Router();

/**
 * Return all sports
 * @route GET /sport
 * @group Sport - Operations about sport
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/', catchErrors(sportController.getAll));

module.exports = router;