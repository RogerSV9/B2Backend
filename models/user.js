'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const Schema = mongoose.Schema


const UserSchema = Schema({
    name: String,
    surname: String,
    username: { type: String, unique:true},
    password: { type: String, select:false},
    email: { type: String, unique:true, lowercase: true},
    signUpDate: { type: Date, default: Date.now()},
    lastLogin: Date,
    age: String,
    picture: String,
    description: String,
    localization: String,
    premium: Boolean,
    tag: [] 
})
//let age = moment('16-10-1998').format('DD-MM-YYYY').fromNow()
//console.log(age)
//var localLocale = moment('1993-10-23').format('YYYY-MM-DD').fromNow();
//moment.locale('es');
//console.log(localLocale)
module.exports = mongoose.model('User', UserSchema)