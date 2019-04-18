'use strict'

const express = require('express')
const UserCtrl = require('../controllers/user')
const MatchCtrl = require('../controllers/match')
const api = express.Router()

//USER ROUTES

//POST
api.post('/users', UserCtrl.postUser)
api.post('/signin', UserCtrl.signIn)
api.post('')

//GET
api.get('/users', UserCtrl.getUsers)
api.get('/users/:username', UserCtrl.getUserbyusername)
api.get('/users/info/:_id', UserCtrl.getUserbyid)

//PUT
api.put('/users', UserCtrl.updateUser)

//DELETE
api.delete('/users/:_id', UserCtrl.deleteUser)



//MATCH ROUTES

//POST
api.post('/matches', MatchCtrl.postMatch)

//GET
api.get('/matches', MatchCtrl.getMatches)


module.exports = api