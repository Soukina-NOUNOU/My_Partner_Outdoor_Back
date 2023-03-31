const express = require('express');
const profilController = require ('../controllers/profilController');

const router = express.Router();

/**
 * Shows a profile by its id
 * @route GET /profil/{id}
 * @group Profil - Operations about profil
 * @param {integer} id.path.required - Profil ID - Profil ID
 * @returns {object} 200 - An object with "result"
 * @returns {Error} 400 - Bad request
 * @returns {Error} 404 - Page not found
 * @returns {Error} 500 - An error has occured and we\'re working to fix problem!
 */
router.get('/:id', profilController.getOne);



module.exports = router;