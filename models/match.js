'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema


const MatchSchema = new Schema({
        username: String,
        confirmed: Boolean,
        matchDate: Date
})

module.exports = mongoose.model('Match', MatchSchema)