const express = require('express');
const eventController = require ('../controllers/eventController');

const router = express.Router();

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
router.get('/:id', eventController.getOne);

router.post('/', eventController.create);

router.patch('/:id', eventController.modify);

router.delete('/:id', eventController.delete);


module.exports = router;