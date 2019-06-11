'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const EventSchema = new Schema({
        name: {type: String, required: true},
        date: {type: Date, required: true},
        location: {type: String, required: true},
        description: String,
        username: String,
        participants: []
})

module.exports = mongoose.model('Event', EventSchema)