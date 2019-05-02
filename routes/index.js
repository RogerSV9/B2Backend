'use strict'

const express = require('express')
const UserCtrl = require('../controllers/user')
const MatchCtrl = require('../controllers/match')
const auth = require('../middlewares/auth')
const api = express.Router()

//USER ROUTES

//POST
api.post('/register', UserCtrl.postUser)
<<<<<<< HEAD
api.post('/signInUser', UserCtrl.signInUser)
api.post('/signInAdmin', UserCtrl.signInAdmin)
api.post('/postmatch', auth, UserCtrl.addMatch)
=======
api.post('/login', UserCtrl.signIn)
api.post('/postmatch', UserCtrl.addMatch)
api.post('/acceptmatch', UserCtrl.acceptMatch)
>>>>>>> 7e3e9f35b1fe42cd61f1c2c7a572a81fd3cb9ce4

//GET
api.get('/users', auth, UserCtrl.getUsers)
api.get('/users/:username', auth, UserCtrl.getUserbyusername)
api.get('/users/info/:_id', auth, UserCtrl.getUserbyid)
api.get('/getmatches', auth, UserCtrl.getMatchbyid)

api.get('/private', auth, (req,res) => {
    res.status(200).send({message: 'Tienes acceso'})
})

//PUT
api.put('/users', auth, UserCtrl.updateUser)

//DELETE
api.delete('/users/:_id', auth, UserCtrl.deleteUser)

//POST
api.post('/matches', auth, MatchCtrl.postMatch)

//GET
api.get('/matches', auth, MatchCtrl.getMatches)


module.exports = api