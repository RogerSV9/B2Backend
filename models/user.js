'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
var ageCalculator = require('age-calculator');
let {AgeFromDateString, AgeFromDate} = require('age-calculator');


const UserSchema = Schema({
    name: String,
    surname: String,
    username: { type: String, unique:true},
    password: { type: String, select:false},
    email: { type: String, unique:true, lowercase: true},
    signUpDate: { type: Date, default: Date.now()},
    lastLogin: Date,
    age: Date,
    picture: String,
    description: String,
    localization: String,
    premium: Boolean,
    tag: [] 
})

let ageFromDate = new AgeFromDate(new Date(1987, 0, 8)).age;
console.log("value from AgeFromDate", ageFromDate);
 
let ageFromString = new AgeFromDateString('1987-01-08').age;
console.log("value from ageFromString", ageFromString);

module.exports = mongoose.model('User', UserSchema)