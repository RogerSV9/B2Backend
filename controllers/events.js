'use strict'

const Event = require('../models/event')
const User = require('../models/user')

const EventCtrl = {}

//Create event
EventCtrl.postEvent = async (req,res) => {
    console.log("hola")
    console.log("name"+ req.body.name)
    console.log("date"+ req.body.date)
    console.log("location"+ req.body.location)
    console.log("description"+ req.body.description)

    const event = new Event()
    console.log(event)

    event.name = req.body.name
    event.date = req.body.date
    event.location = req.body.location
    event.description = req.body.description

    try {
        await event.save()
        return res.status(200).send(event)
    } catch (err) {
        res.status(500).send(err)
    }
}

//Get all events
EventCtrl.getEvents = async (req,res) => {
    const events = await Event.find()
    res.json(events)
}

//Delete event
EventCtrl.deleteEvent = async (req,res) => {
    try {
        const _id = req.params._id
        let user = await Event.findByIdAndRemove(_id)
        if (!event) {
            return res.status(404).send({message: 'Event'})
        } else {            
            res.status(200).send({message: 'Event deleted succesfully'})
          }
        } catch (err) {
            res.status(500).send(err)
          }
        }


        module.exports = EventCtrl