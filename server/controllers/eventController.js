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


