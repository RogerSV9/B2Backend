'use strict'

const express = require('express')
const UserCtrl = require('../controllers/user')
const MatchCtrl = require('../controllers/match')
const auth = require('../middlewares/auth')
const api = express.Router()

//USER ROUTES

//POST
api.post('/register', UserCtrl.postUser)
api.post('/login', UserCtrl.signIn)
api.post('/postmatch', UserCtrl.addMatch)
api.post('/acceptmatch', UserCtrl.acceptMatch)

//GET
api.get('/users', UserCtrl.getUsers)
api.get('/users/:username', UserCtrl.getUserbyusername)
api.get('/users/info/:_id', UserCtrl.getUserbyid)
api.get('/getmatches', UserCtrl.getMatchbyid)

api.get('/private', auth, (req,res) => {
    res.status(200).send({message: 'Tienes acceso'})
})

//PUT
api.put('/users', UserCtrl.updateUser)

//DELETE
api.delete('/users/:_id', UserCtrl.deleteUser)

//POST
api.post('/matches', MatchCtrl.postMatch)

//GET
api.get('/matches', MatchCtrl.getMatches)


module.exports = api