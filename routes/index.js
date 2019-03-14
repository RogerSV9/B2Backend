'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const matchCtrl = require('../controllers/match')
const api = express.Router()

api.get('/users', userCtrl.getUsers)
api.post('/user', userCtrl.createUser)
api.get('/matches', matchCtrl.getMatches)
api.post('/match', matchCtrl.createMatch)

module.exports = api