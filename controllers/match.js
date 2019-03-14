'use strict'

const Match = require('../models/match')

function createMatch(req, res){
    console.log(req.body)
    let match = new Match()
    match.username = req.body.username
    match.confirmed = req.body.confirmed
    match.matchDate = req.body.matchDate

   match.save((err, matchStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({match: matchStored})
    })
}

function getMatches(req, res){
    Match.find({}, (err, matches)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!matches) return res.status(404).send({message: `No hay matches`})
        
        res.status(200).send(matches);
    })
}

module.exports = {
    getMatches,
    createMatch
}