const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    discription: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    totalSeats: {
        type: Number,
        required: true
    },
    availableSeats: {
        type: Number,
        required: true
    },
    ticketPrice: {
        type: Number,
        required: true,
        min: 0
    },
    location: {
        type: String, 
        required: true,
    },
    imageUrl: {
        type: String
    },
    eventType: {
        type: String,
        enum: ['free', 'paid'],
        default: 'free'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, 
    {timestamps: true});

module.exports = mongoose.model('event', eventSchema)

