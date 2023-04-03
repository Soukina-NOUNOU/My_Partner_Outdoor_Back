const express = require('express');
const eventController = require ('../controllers/eventController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const router = express.Router();



/**
 * Shows random events
 * @route GET /event/random
 * @group Event - Operations about event
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/random', catchErrors(eventController.getRandom));

/**
 * Shows search events
 * @route GET /event/s?search={search}&dept={dept}
 * @group Event - Operations about event
 * @param {string} search.path.required - Sport Name - "Football"
 * @param {integer} dept.path.required - Departement Number - "75"
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/s', catchErrors(eventController.getSearch));

/**
 * Shows a event by its id
 * @route GET /event/{id}
 * @group Event - Operations about event
 * @param {integer} id.path.required - Event ID - Event ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/:id', catchErrors(eventController.getOne));

router.post('/', eventController.create);



module.exports = router;