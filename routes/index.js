'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api = express.Router()

api.get('/user', userCtrl.getUsers)
api.post('/user', userCtrl.createUser)

module.exports = api