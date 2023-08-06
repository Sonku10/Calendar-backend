const express = require('express')
const Event = require('../models/Event')


const getEvents = async (req, res = express.response) => {

    const events = await Event.find().populate('user', 'name')




    res.status(201).json({
        ok: true,
        events
    })
}

const createEvents = async (req, res = express.response) => {
    const event = new Event(req.body)
    try {

        event.user = req.uid

        const saveEvent = await event.save()

        res.json({
            ok: true,
            saveEvent
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'get fucked'
        })
    }

}

const updateEvents = async (req, res = express.response) => {

    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById(eventId)

        if(!event) {
            res.status(400).json({
                ok:false, 
                msg:"not part of the club"
            })
        }
        else if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "not yours dude",
                
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }
        
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true})

        res.json({
            ok: true,
            event: updatedEvent
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"get fucked"
        })
    }

}

const deleteEvents = async (req, res = express.response) => {


    const eventId = req.params.id
    const uid = req.uid

    try {
        const event = await Event.findById(eventId)

        if(!event) {
            res.status(400).json({
                ok:false, 
                msg:"not part of the club"
            })
        }
        else if(event.user.toString() !== uid){
            return res.status(401).json({
                ok: false,
                msg: "not yours dude",
                
            })
        }
        
        await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"get fucked"
        })
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents,
}