const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    carId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()
    },
    status:{
        type: String,
        enum: ['Новое', 'Принято', 'Отклонено'],
        default: 'Новое'
    }
});

const Booking = mongoose.model('Booking', schema);
module.exports = Booking;