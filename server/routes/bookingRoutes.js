const express = require('express');
const router = express.Router();

const { admin, protect } = require('../middlewares/auth');


router.get('/', protect, bookEvent);
router.get('/myBookings', protect, getMyBookings);
router.post('/send-otp', protect, sendBookingOTP);
router.put('/:id/confirm', protect, admin, confirmBooking);
// router.post('/:id', protect, cancelBooking);
router.delete('/:id', protect, cancelBooking);



module.exports = router;