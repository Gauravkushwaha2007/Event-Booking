const express = require('express');
const router = express.Router();

const { admin, protect } = require('../middlewares/auth');
const { bookEvent, sendBookingOTP, getMyBookings, confirmBooking, cancelBooking } = require('../controllers/bookingController');


router.get('/', protect, bookEvent);
router.post('/send-otp', protect, sendBookingOTP);
router.get('/myBookings', protect, getMyBookings);
router.put('/:id/confirm', protect, admin, confirmBooking);
// router.post('/:id', protect, cancelBooking);
router.delete('/:id', protect, cancelBooking);


module.exports = router;