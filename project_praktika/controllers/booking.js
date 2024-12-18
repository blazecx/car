const Booking = require('../models/bid.model');

exports.getBooking = async(req,res)=>{
    const {_id} = req.params;
    const bookget = await Booking.findById(_id);
    if(!bookget) return res.status(404).json({message: 'Запись не найдена'});
    res.json(bookget);
}