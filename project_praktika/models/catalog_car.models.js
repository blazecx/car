const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    preview:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 500
    }, 
    price:{
        type: Number,
        required: true,
        minlength: 1,
        maxlength: 15
    }
},
    {
        timestamps: true
    });

const Car = mongoose.model('Car', schema);

module.exports = Car;