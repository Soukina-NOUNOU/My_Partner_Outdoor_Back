const express = require('express');
const userRouter = require('./userRouter');
const eventRouter = require ('./eventRouter');
const router = express.Router();

router.use('/user', userRouter);
router.use('/event', eventRouter);

router.get('/', function (req, res) {
    res.send('Hello World')
  });


module.exports = router;