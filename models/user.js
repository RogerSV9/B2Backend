'use strict'

const mongoose = require('mongoose')
//Librería para encriptar la contraseña
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')
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
    category: {type: String, enum: ['user', 'premium', 'admin'], default: 'user'},
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

//Función que se ejecuta antes de que se salve
UserSchema.pre('save', (next) => {
    let user = this

    //Genera un salt de 10 = num de dígitos aleatorios que se le agrega al hash
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        //Hash cifra la contraseña creando un código
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
})

//Función Gravatar
UserSchema.methods.gravatar = function () {
    //Si user no tiene email registrado en gravatar, devuelve un gravatar by default
    if (!this.email) return 'http://gravatar.com/avatar/?s=200&d=retro'

    //md5 = tipo de hash que usa gravatar
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)