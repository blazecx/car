const express = require('express');
const {createBooking} =require('../controllers/add.bid');

const router = express.Router();

router.post('/createBooking',createBooking);

module.exports = router;