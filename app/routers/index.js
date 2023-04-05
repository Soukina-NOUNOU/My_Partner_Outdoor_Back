const express = require('express');
const userRouter = require('./userRouter');
const eventRouter = require ('./eventRouter');
const router = express.Router();

// Route User
router.use('/user', userRouter);
// Route Event
router.use('/event', eventRouter);

module.exports = router;