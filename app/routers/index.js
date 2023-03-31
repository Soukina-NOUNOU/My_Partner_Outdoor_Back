const express = require('express');
const profilRouter = require('./profilRouter');
const eventRouter = require ('./eventRouter');
const router = express.Router();

router.use('/profil', profilRouter);
router.use('/event', eventRouter);

router.get('/', function (req, res) {
    res.send('Hello World')
  });


module.exports = router;