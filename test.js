 //test with insomnia
	// {
	// 	"id": 3,
	// 	"title": "Une journée à faire du vélo",
	// 	"start": "2023-04-01 12:00:44.880791+02",
	// 	"finish": "2023-04-01 19:00:44.880791+02",
	// 	"nb_participant":"6",
	// 	"equipement": "velo",
	// 	"price": "",
	// 	"picture": "",
	// 	"organizer_id": "1",
	// 	"sport_id": "6",
	// 	"level_id": "2",
	// 	"address_id": "2"
	
	// }

	// {
	// 	"id": 10,
	// 	"title": "une belle journée",
	// 	"description": "Une journée à faire du vélo",
	// 	"start": "2023-04-01T10:00:44.880Z",
	// 	"finish": "2023-04-01T10:00:44.880Z",
	// 	"nb_participant": "10",
	// 	"equipement": "vélo",
	// 	"price": "0",
	// 	"picture": "string",
	// 	"organizer_id": "1",
	// 	"sport_id": "3",
	// 	"level_id": "2",
	// 	"address_id": "2",
	// 	"created_at": "2023-03-31T11:25:41.161Z",
	// 	"updated_at": null
	// }
/**
 * Create a Event
 * @route POST /event
 * @group Event - Operations about event
 * @param {object} data.body.required - The Event data
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */


/**
 * a category type of Event
 * 
 * @typedef PostEvent
 * @property {integer} id - event id
 * @property {text} firstname - user firstname
 * @property {text} lastname - user lastname
 * @property {text} email - user email
 * @property {text} password - user password
 * @property {text} pseudo - user pseudo
 * @property {text} picture - user picture
 * @property {text} birthday - user birthday
 * @property {text} bio - user label
 * @property {timestampz} created_at - date of creation
 * @property {timestampz} updated_at - date of last update
 * 
 */
/**
 * Create a Event
 * @route POST /event
 * @group Event - Operations about event
 * @param {object} data.body.required - The Event data
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Category must be a number
 * @returns {Error} 400 - {field} can't be empty or must be text
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */