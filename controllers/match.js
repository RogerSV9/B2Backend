'use strict'

const User = require('../models/user')
const Match = require('../models/match')

const MatchCtrl = {}

//Create match
MatchCtrl.postMatch = function (username) {
    const match = new Match()
    console.log(match)
    
    match.username = username
  
    try {
      match.save();
      return match;
      //res.status(200).send({message: "Match created successfully"})
    } catch (err) {
      //res.status(500).send(err);
      console.log(err);
    }
  }

//Get matches
MatchCtrl.getMatches = async (req, res) => {
    const allmatches = await Match.find()
    res.json(allmatches)
  }


module.exports = MatchCtrl