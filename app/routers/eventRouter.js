const express = require('express');
const eventController = require ('../controllers/eventController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const validate = require('../middlewares/validation/validation');
const { post: postSchema, get: getSchema, path: pathSchema } = require('../middlewares/validation/schema/event');
const router = express.Router();

/**
 * Models type of EventPost
 * @typedef EventPost
 * @property {string} title - event title
 * @property {string} description - event description
 * @property {timestamp} start - event start
 * @property {timestamp} finish - event finish
 * @property {integer} nb_participant - event nb_participant
 * @property {string} equipement - event equipement
 * @property {number} price - event price
 * @property {string} picture - event picture
 * @property {integer} organizer_id - event organizer_id
 * @property {integer} number - event address number
 * @property {string} street - event address street
 * @property {integer} zip_code - event address zip_code
 * @property {string} city - event address city
 * @property {string} sport - event sport
 * @property {string} level - event level
 * 
 */

/**
 * Models type of EventPatch
 * @typedef EventPatch
 * @property {string} title - Title
 * @property {string} description - Description
 * @property {timestamp} start - Event start time
 * @property {timestamp} finish - Event finish time
 * @property {integer} nb_participant - Nombre participant
 * @property {string} equipement - Equipement
 * @property {number} price - Price
 * @property {string} picture - Picture
 * @property {string} number - Address number
 * @property {string} street - Address street
 * @property {string} zip_code - Address zip_code
 * @property {string} city - Address city
 * @property {string} level - Level (Débutant, Intermediaire, Confirmé)
 * @property {string} sport - Sport (FootBall, VolleyBall, BasketBall, PingPong, Tennis, Velo, Badminton)
 * 
 */

/**
 * Shows Users in event
 * @route GET /event/{id}/users
 * @group Event - Operations about event
 * @param {integer} id.path.required - Event ID - Event ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/:id/users', catchErrors(eventController. getEventUsers)),

/**
 * Add user in one event
 * @route POST /event/{id}/{userid}
 * @group Event - Operations about event
 * @param {integer} id.path.required - Event ID - Event ID
 * @param {integer} userid.path.required - User ID - User ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/:id/:userid', catchErrors(eventController.CreateEventAsUser));

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
 * @param {string} search.path - Sport Name - "Football"
 * @param {integer} dept.path - Departement Number - "75"
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

/**
 * Update an existing event
 * @route PATCH /event/{id}
 * @group Event - Operations about event
 * @param {integer} id.path.required - Event ID - ID of the event to update
 * @param {EventPatch.model} data.body.required - The event object to be updated
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we're working to fix the problem!
 */
router.patch('/:id', catchErrors(eventController.modify));

/**
 * Deletes an event by its id
 * @route DELETE /event/{id}
 * @group Event - Operations about event
 * @param {integer} id.path.required - Event ID - Event ID to delete
 * @returns {object} 200 - An object with "message"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Event not found
 * @returns {Error} 500 - An error has occurred and we're working to fix problem!
 */
router.delete('/:id', catchErrors(eventController.delete));

/**
 * Create a new Event
 * @route POST /event
 * @group Event - Operations about event
 * @param {EventPost.model} data.body.required The event object to be created
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.post('/', validate(postSchema, 'body'), catchErrors(eventController.create));

module.exports = router;