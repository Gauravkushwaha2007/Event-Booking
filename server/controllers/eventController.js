const Event = require('../models/eventModel');

exports.getAllEvents = async (req, res) => {
  try {
    const { search, category, location } = req.query;
    const filter = {};
    
    // Search by event title or description
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { discription: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    // Filter by category
    if (category) {
      filter.category = { $regex: category, $options: 'i' };
    }

    // Filter by location
    if (location) {
      filter.location = { $regex: location, $options: 'i' };
    }

    const events = await Event.find(filter);

    return res.json(events);
  } catch (error) {
    return res.status(500).json({
      message: 'Events fetch karne mein error aaya.',
    });
  }
};


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