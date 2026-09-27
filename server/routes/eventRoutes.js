const express = require('express');
const { protect, admin } = require('../middlewares/auth');
const { getAllEvents } = require('../controllers/eventController')

const router = express.Router()

router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.post('/create', protect, admin, createEvent)
router.put('/:id', protect, admin, updateEvent);
router.post('/:id', protect, admin, deleteEvent);