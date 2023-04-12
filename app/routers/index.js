const express = require('express');
const userRouter = require('./userRouter');
const eventRouter = require ('./eventRouter');
const sportRouter = require('./sportRouter');
const levelRouter = require('./levelRouter');
const { route } = require('./userRouter');
const router = express.Router();

// Route User
router.use('/user', userRouter);
// Route Event
router.use('/event', eventRouter);
// Route Sport
router.use('/sport', sportRouter);
// Route Level
router.use('/level', levelRouter);

module.exports = router;