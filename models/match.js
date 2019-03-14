'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema


const MatchSchema = new Schema({
        username1: String,
        confirmed: Boolean,
        matchDate: Date,
        username2: {
                type: Schema.Types.ObjectId,
                ref: 'User'
        }
})

module.exports = mongoose.model('Match', MatchSchema)