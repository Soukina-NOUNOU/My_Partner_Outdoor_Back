const express = require('express');
const profilController = require ('../controllers/profilController');
const { catchErrors } = require('../middlewares/handlers/errorHandlers');

const router = express.Router();

router.get('/:id', catchErrors(profilController.getOne));



module.exports = router;