'use strict'

const express = require('express')
const UserCtrl = require('../controllers/user')
const MatchCtrl = require('../controllers/match')
const ImageCtrl = require('../controllers/image')
const EventCtrl = require('../controllers/events')
const auth = require('../middlewares/auth')
const api = express.Router()

//POST
//UserCtrl
api.post('/register', UserCtrl.postUser)
api.post('/signInUser', UserCtrl.signInUser)
api.post('/signInAdmin', UserCtrl.signInAdmin)
api.post('/postmatch', auth, UserCtrl.addMatch)
api.post('/acceptmatch', UserCtrl.acceptMatch)
api.post('/uploadimage/:id', ImageCtrl.uploadimage)
api.post('/availablematches', UserCtrl.tags)
api.post('/postrating', UserCtrl.postrating)

//ImageCtrl
api.post('/uploadimage', ImageCtrl.uploadimage)
//api.post('/passid', ImageCtrl.passid)

//EventCtrl
api.post('/events', EventCtrl.postEvent)

//GET

//UserCtrl
api.get('/users', auth, UserCtrl.getUsers)
api.get('/users/:username', UserCtrl.getUserbyusername)
api.get('/users/info/:_id', UserCtrl.getUserbyid)
api.get('/getmatches', auth, UserCtrl.getMatchbyid)

api.get('/private', auth, (req,res) => {
    res.status(200).send({message: 'Tienes acceso'})
})


//EventCtrl
api.get('/events', EventCtrl.getEvents)

//PUT
api.put('/users', auth, UserCtrl.updateUser)

//DELETE
api.delete('/users/:_id', auth, UserCtrl.deleteUser)
api.delete('/events/:_id', auth, EventCtrl.deleteEvent)

//POST
api.post('/matches', auth, MatchCtrl.postMatch)

//GET
api.get('/matches', auth, MatchCtrl.getMatches)


module.exports = api