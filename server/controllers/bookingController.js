const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');
const Otp = require('../models/otpModel');
const User = require('../models/userModel');
const {sendOtpEmail} = require('../utils/email')


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};


// Send a fresh OTP before the user confirms an event booking.
exports.sendBookingOTP = async (req, res, next) => {
    const otp = generateOTP();

    // Remove any older booking OTP so only the latest code remains valid.
    await Otp.findOneAndDelete({
        email: req.user.email,
        action: 'Event_Booking'
    });

    await Otp.create({
        email: req.user.email,
        otp,
        action: 'Event_Booking'
    });

    await sendOtpEmail(req.user.email, otp, 'Event_Booking');

    res.json({ message: 'Booking OTP sent to your email' });
};


exports.bookEvent = async (req, res, next) => {
    const { eventId, otp } = req.body;

    if (!eventId || !otp) {
        return res.status(400).json({ message: 'Event ID and OTP are required' });
    }

    // OTP is tied to the logged-in user, so another user cannot reuse it.
    const otpRecord = await Otp.findOne({
        email: req.user.email,
        otp,
        action: 'Event_Booking'
    });

    if (!otpRecord) {
        return res.status(400).json({ error: 'Invalid OTP' });
    }

    const event = await Event.findById(eventId);

    if (!event) {
        return res.status(404).json({ error: 'Event not found' });
    }

    if (event.availableSeats <= 0) {
        return res.status(400).json({ message: 'Sorry, no seats available' });
    }

    const existingBooking = await Booking.findOne({
        event: eventId,
        user: req.user._id
    });

    if (existingBooking) {
        return res.status(400).json({ message: 'Already booked for this event' });
    }

    await Booking.create({
        event: eventId,
        user: req.user._id,
        status: 'pending',
        paymentStatus: 'not_paid',
        amount: event.ticketPrice
    });

    // A pending booking already reserves one seat.
    event.availableSeats -= 1;
    await event.save();

    // Make the OTP single-use after a successful booking.
    await Otp.deleteMany({
        email: req.user.email,
        action: 'Event_Booking'
    });

    return res.status(201).json({
        message: 'Booking created, please check your email'
    });
};


exports.getMyBookings = async (req, res, next) => {
    const bookings = await Booking.find({
        user: req.user._id
    }).populate('event');

    res.json(bookings);
};


exports.confirmBooking = async (req, res, next) =>{
    const event = Event.findById(req.param._id)
}

exports.cancelBooking = async (req, res, next) =>{
    const booking = await Booking.findById(req.params._id).populate('eventId');
    if(!booking) {
        return res.status(404).json({error: 'Booking not found'});
    }

    if (booking.status === 'confirmed' ) {
        const event = await Event.findById(booking.event._id);
        event.availableSeats += 1;
        await event.save();
    }

    booking.status = 'cancelled';
    await booking.save();
    await booking.remove();
    res.json({message: 'Booking Cancelled'});

    // Both pending and confirmed bookings have already reserved a seat.
    const event = await Event.findById(booking.event);

    if (event) {
        event.availableSeats += 1;
        await event.save();
    }

    await Booking.findByIdAndDelete(booking._id);

    res.json({ message: 'Booking cancelled successfully' });
};
