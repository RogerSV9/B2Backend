'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema


const MatchSchema = new Schema({
        username: String,
        matchDate: {type: Date, default: Date.now()}
})

module.exports = mongoose.model('Match', MatchSchema)