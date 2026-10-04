const Booking = require('../models/bookingModel');
const Event = require('../models/eventModel');
const Otp = require('../models/otpModel');
const User = require('../models/userModel');
const {sendOtpEmail, sendBookingEmail} = require('../utils/email')


const generateOTP = () =>{
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendBookingOTP = async (req, res, next) =>{
    const otp = generateOTP();
    await Otp.findOneAndDelete({email: req.user.email, action: 'Event_Booking'});
    await Otp.create({
        email: req.user.email,
        otp, 
        action: 'Event_Booking'
    });
    await sendOtpEmail(req.user.email, otp, 'Event_Booking');
    res.json({message: 'Booking Otp sent to your gamil'});

}

exports.bookEvent = async (req, res, next) =>{
    const {eventId, otp } = req.body;

    const otpRecord = await Otp.findOne({email: req.user.email, otp, action: 'Event_Booking'});
    if(!otpRecord) {
        return res.status(400).json({error: 'Invalid Otp'});
    }

    const event = await Event.findById(eventId);
    if(!event) {
        return res.status(404).json({error: 'Event not found'});
    }

    if (event.availableSeats <= 0) {
        return res.status(400).json({message: 'Sorry, No Seats available'});
    }

    const existingBooking = await Booking.findOne({event: eventId, user: req.user._id});
    if(existingBooking) {
        return res.status(400).json({message: 'Already booked for this event'});
    }


    await Booking.create({
        event: eventId,
        user: req.user._id,
        status: 'pending',
        paymentStatus: 'not_paid',
        amount: event.ticketPrice
    });

    event.availableSeats--;
    await event.save();
    await Otp.deleteMany({email: req.user.email, action: 'Event_Booking'});
    return res.status(201).json({message: 'Booked created, Please check your email'})
}



exports.getMyBookings = async (req, res, next ) =>{
    const bookings = await Booking.find({user: req.user._id}).populate('event');
    res.json(bookings);
}


exports.confirmBooking = async (req, res, next) =>{
    const paymentStatus = req.body;
    const booking = await Booking.findById(req.params._id).populate('event');
    if(!booking){
        return res.status(404).json({error: 'Booking not found'})
    }

    if(booking.status === 'confirmed'){
        return res.status(400).json({message: 'Booking already done!'});
    }

    const event = await Event.findById(booking.event._id);
    if(event.availableSeats <= 0) {
        return res.status(400).json({message: 'No seats available'});
    }

    booking.status = 'confirmed';
    if(paymentStatus) {
        booking.paymentStatus = paymentStatus;
    }
    await booking.save();

    event.availableSeats -= 1;
    await event.save();

    await sendBookingEmail(req.user.email, req.user.name ,event.title);
    
    res.json({message: 'Booking confirmed Success!'});


}

exports.cancelBooking = async (req, res, next) =>{
    const booking = await Booking.findById(req.params._id);
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
    
}
