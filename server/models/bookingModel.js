const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String, 
        enum: ['pending', 'confirmed', 'cancelled']
    },
    paymentStatus: {
        type: String, 
        enum: ['paid', 'not_paid'],
        default: 'not_paid',
    },
    ammount: {
        type: Number,
        required: true
    }

}, {timestamps: true});

