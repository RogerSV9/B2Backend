'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    surname: String,
    username: { type: String, unique:true},
    password: { type: String},
    email: { type: String, unique:true, lowercase: true},
    signUpDate: { type: Date, default: Date.now()},
    lastLogin: { type: Date, default: Date.now()},
    age: String,
    picture: String,
    description: String,
    localization: String,
    premium: Boolean,
    tag: [],
    matches: [{
        type: Schema.Types.ObjectId,
        ref: 'Match'
    }],
    ratings: [
        {
            numberOfStars: Number,
            created: { 
                type: Date,
                default: Date.now
            }
        }
    ]
})

let age = moment('2016-11-23').fromNow()
console.log(age)

module.exports = mongoose.model('User', UserSchema)