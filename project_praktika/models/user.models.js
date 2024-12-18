const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    number_phone:{
        type: String,
        required: true,
        unique: true,
        minlength: 11,
        maxlength: 13
    },
    email:{
        type: String,
        required: true,
        unique: true
        
    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    role:{
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    seria:{
        type: String,
        required: true,
        unique: true,
        minlength: 4,

    },
    number:{
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    }
}, { 
    timestamps: true 
});
const User = mongoose.model('User', schema);
module.exports = User;