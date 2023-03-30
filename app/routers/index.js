const express = require('express');
const profilRouter = require('./profilRouter');
const router = express.Router();

router.use('/profil', profilRouter);

router.get('/', function (req, res) {
    res.send('Hello World')
  });


module.exports = router;