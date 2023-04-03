const express = require('express');
const userRouter = require('./userRouter');
const router = express.Router();

router.use('/user', userRouter);

router.get('/', function (req, res) {
    res.send('Hello World')
  });


module.exports = router;