'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MatchSchema = new Schema({
        username: String,
        confirmed: {type: Boolean, default: false},
        matchDate: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Match', MatchSchema)