const express = require('express');
const { protect, admin } = require('../middlewares/auth');
const { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent } = require('../controllers/eventController')

const router = express.Router()

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/create', protect, admin, createEvent)
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;