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
        const event = await Event.findById(req.params.id);
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
        const eventBody =  {title, description, date, category, totalSeats, availableSeats, ticketPrice, location, imageUrl, eventType, createdBy: req.user._id} = req.body;
        const event = await Event.create(eventBody);
        return res.status(201).json(event);

    }
    catch (e){
        return res.status(500).json({error: e.message})
    }
}


exports.updateEvent = async (req, res) =>{
    const eventData = {title, description, date, category, totalSeats, availableSeats, ticketPrice, location, imageUrl, eventType} = req.body;

    try{
        let event = await Event.findByIdAndUpdate(req.params.id, eventData);
        if(!event) {
            return res.status(404).json({error: 'Event not found'})
        }
        return res.json(event);
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }
}


exports.deleteEvent = async (req, res) =>{
    try{
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event) {
            return res.status(404).json({error: 'Event Not found'});
        }
        return res.json({message: 'Deleted Successfully', event})
    }
    catch (e) {
        res.status(500).json({error: e.message});
    }

}