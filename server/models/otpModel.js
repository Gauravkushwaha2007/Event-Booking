const mongoose = require('mongoose');

const OTP = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {

    },
    action: {
        type: String,   
        enum: ['Account_verification', 'Event_Booking'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 500 
    }
});

module.exports = mongoose.model('OTP',OTP);