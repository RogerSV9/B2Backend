'use strict'

const User = require('../models/user')
const Match = require('../models/match')

//Create match
function createMatch(req, res){
    console.log(req.body)
    let match = new Match()
    let user = new User()
    match.username = req.body.username
    match.confirmed = req.body.confirmed
    match.matchDate = req.body.matchDate

    match.save((err, matchStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({match: matchStored})
        console.log(matchStored)
        user.matches.push(matchStored._id)
    })
    let username = "andrea"
    User.findOne({username: "andrea"}, (err, user) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!user) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send(user)

        console.log(user)
    })
    User.findOneAndUpdate(username, user, {new: true}, (err, user2)=>{
        res.status(200).send(user2)
    })
}


//Get matches
function getMatches(req, res){
    Match.find({}, (err, matches)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!matches) return res.status(404).send({message: `No hay matches`})
        
        res.status(200).send(matches);
    })
}

module.exports = {
    createMatch,
    getMatches
}