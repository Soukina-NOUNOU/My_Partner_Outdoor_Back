const express = require('express');
const eventController = require ('../controllers/eventController');
const upload = require('../middlewares/multer');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');
const validate = require('../middlewares/validation/validation');
const { checkParamsId } = require ('../middlewares/checkParams');
const { checkJWT } = require('../middlewares/security');
const { post: postSchema, get: getSchema, path: patchSchema } = require('../middlewares/validation/schema/event');
const router = express.Router();

/**
 * Models type of EventPost
 * @typedef EventPost
 * @property {string} title - Tournois de Football
 * @property {string} description - Tournois de Football 5 vs 5
 * @property {timestamp} start - 13H00
 * @property {timestamp} finish - 17H00
 * @property {integer} nb_participant - 25
 * @property {string} equipement - Chaussures de Foot et protections
 * @property {number} price - 0
 * @property {string} picture - My event picture
 * @property {integer} organizer_id - 1
 * @property {integer} number - 125
 * @property {string} street - Avenue du Général de Gaulle
 * @property {string} zip_code - 75001
 * @property {string} city - Paris
 * @property {string} sport - FootBall
 * @property {string} level - Débutant
 */

/**
 * Models type of EventPatch
 * @typedef EventPatch
 * @property {string} title - Tournois de Tennis
 * @property {string} description - Tournois de Tennis à élimination direct en 3 sets
 * @property {timestamp} start - 13H00
 * @property {timestamp} finish - 17H00
 * @property {integer} nb_participant - 20
 * @property {string} equipement - Raquettes et balles de tennis
 * @property {number} price - 0
 * @property {string} picture - My event picture
 * @property {string} number - 125
 * @property {string} street - Avenue du Général de Gaulle
 * @property {string} zip_code - 75001
 * @property {string} city - Paris
 * @property {string} level - Intermediaire
 * @property {string} sport - Tennis
 */

/**
 * Models type of EventMessagePost
 * @typedef EventMessagePost
 * @property {string} content - My message
 * @property {integer} user_id - 1
 */


/**
 * Delete a user from event
 * @route DELETE /event/{id}/user/{userid}
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @param {integer} userid.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request  "event_id or user_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.delete('/:id/user/:userid', checkParamsId, catchErrors(eventController.deleteUser));

/**
 * Add a user in event
 * @route POST /event/{id}/user/{userid}
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @param {integer} userid.path.required - user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request  "event_id or user_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.post('/:id/user/:userid', checkParamsId, catchErrors(eventController.createEventAsUser));

/**
 * Delete a message in event
 * @route DELETE /event/{id}/message/{messageid}
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @param {integer} messageid.path.required - message_id
 * @returns {object} 200 - An object with "message"
 * @returns {Error} 400 - Bad request  "event_id or message_id invalid"
 * @returns {Error} 404 - Event not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.delete('/:id/message/:messageid', checkParamsId, catchErrors(eventController.deleteMessage));

/**
 * Return users in event
 * @route GET /event/{id}/users
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request  "event_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/:id/users', checkParamsId,catchErrors(eventController. getEventUsers)),

/**
 * Return All messages event
 * @route GET /event/{id}/messages
 * @group Event - Operations about event message
 * @param {integer} id.path.required - event_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "event_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/:id/messages', checkParamsId, catchErrors(eventController.getMessages));

/**
 * Create an event message
 * @route POST /event/{id}/message
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @param {EventMessagePost.model} data.body.required - content, user_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "event_id or data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.post('/:id/message', checkParamsId, catchErrors(eventController.createMessage));

// Upload image
router.patch('/:id/upload', upload.single('picture'), catchErrors(eventController.modify));

/**
 * Return random events
 * @route GET /event/random
 * @group Event - Operations about event
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/random', catchErrors(eventController.getRandom));

/**
 * Return search events
 * @route GET /event/s?search={search}&dept={dept}
 * @group Event - Operations about event
 * @param {string} search.path - sport name - "Football"
 * @param {integer} dept.path - departement number - "75"
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "sport name or departement number invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/s', catchErrors(eventController.getSearch));

/**
 * Return an event by its id
 * @route GET /event/{id}
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "event_id invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.get('/:id', checkParamsId, validate(getSchema, 'params'), catchErrors(eventController.getOne));

/**
 * Update an existing event
 * @route PATCH /event/{id}
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @param {EventPatch.model} data.body.required - title, description, start, finish, nb_participant, equipement, price, picture, number, street, zip_code, city, level, sport
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request "event_id or data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.patch('/:id', checkParamsId, validate(patchSchema, 'body'), catchErrors(eventController.modify));

/**
 * Deletes an event by its id
 * @route DELETE /event/{id}
 * @group Event - Operations about event
 * @param {integer} id.path.required - event_id
 * @returns {object} 200 - An object with "message"
 * @returns {Error} 400 - Bad request "event_id invalid"
 * @returns {Error} 404 - Event not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.delete('/:id', checkParamsId, catchErrors(eventController.delete));

/**
 * Create a new event
 * @route POST /event
 * @group Event - Operations about event
 * @param {EventPost.model} data.body.required title, description, start, finish, nb_participant, equipement, price, picture, number, street, zip_code, city, sport, level
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 -  Bad request "data invalid"
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occurred and we\'re working to fix problem!
 */
router.post('/', validate(postSchema, 'body'), catchErrors(eventController.create));

module.exports = router;