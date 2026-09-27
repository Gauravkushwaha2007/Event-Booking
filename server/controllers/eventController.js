const Event = require('../models/eventModel');


exports.getAllEvents = async (req, res, next)=>{
    try{

        const events = await Event.find();
        res.json(events);
    }
    catch (e) {
        return res.json({message: 'Events Not found'});
    }
}

exports.getEventById = async (req, res) =>{
    try{
        const event = await Event.getEventById(req.params._id);
        if(!event) {
            return res.json({message: 'No Event found'})
        }
        return res.json(event);
    }
    catch{

    }
}

exports.createEvent = async (req, res) =>{

    try{
        const eventBody =  {title, description, date, category, totalSeat, availableSeat, ticketPrice, location, imageUrl, eventType} = req.body;
        const event = await Event.create(eventBody);
        res.status(201).json(event);

    }
    catch (e){
        res.status(500).json({error: e.message})
    }
}


exports.updateEvent = async (req, res) =>{
    const eventData = {title, description, date, category, totalSeat, availableSeat, ticketPrice, location, imageUrl, eventType} = req.body;

    try{
        let event = await Event.findByIdAndUpdate(req.params._id, eventData);
        if(!event) {
            res.status(404).json({error: 'Event not found'})
        }
        res.json(event);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}

