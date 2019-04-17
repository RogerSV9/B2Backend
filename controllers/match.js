'use strict'

const User = require('../models/user')
const Match = require('../models/match')

const MatchCtrl = {}

//Create match
MatchCtrl.postMatch = async (req, res) => {
    const match = new Match()
    console.log(match)
    
    match.username = req.body.username
    match.confirmed = req.body.confirmed
    match.matchDate = req.body.matchDate
  
    try {
      await user.save();
      res.status(200).send({message: "Match created successfully"})
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  }

//Get matches
MatchCtrl.getMatches = async (req, res) => {
    const allmatches = await Match.find()
    res.json(allmatches)
  }


module.exports = MatchCtrl