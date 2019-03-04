'use strict'

const express = require('express')
const userCtrl = require('../controllers/user')
const api = express.Router()

api.post('/user', userCtrl.createUser)

module.exports = api