'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const matchCtrl = require('../controllers/match')
const api = express.Router()

api.get('/users', userCtrl.getUsers)
//api.get('/users', userCtrl.getUser1)
api.get('/users/:_id', userCtrl.getUser2)
api.get('/listusers', userCtrl.getUsers)
api.post('/users', userCtrl.createUser)
api.put('/users/:_id', userCtrl.updateUser)
api.delete('/users/:_id', userCtrl.deleteUser)
api.post('/signin', userCtrl.signin)

api.get('/matches', matchCtrl.getMatches)
api.post('/matches', matchCtrl.createMatch)

module.exports = api