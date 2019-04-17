'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    surname: {type: String},
    username: { type: String, unique:true, required: true},
    password: {type: String, required: true},
    email: { type: String, unique:true, lowercase: true, required: true},
    age: {type: String},
    signUpDate: { type: Date, default: Date.now()},
    lastLogin: { type: Date, default: Date.now()},
    picture: String,
    description: String,
    localization: String,
    category: {type: String, enum: ['user', 'premium', 'admin']},
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