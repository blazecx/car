const Booking = require('../models/bid.model');

exports.createBooking = async (req, res) => {
    const {userId,carId, date,} = req.body;
    const existingBooking = await Booking.findOne({carId, date });
    if(existingBooking) return res.status(400).json({message: 'Запись на это время уже существует'});
    const booking = await Booking.create({
       userId,
       carId,
        date,

    });
    console.log(booking);
    res.json(booking);
}