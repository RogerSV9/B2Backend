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
//Update a match
MatchCtrl.updateMatch = async function (id) {
  let variable
  try {
    console.log("ONE -- UPDATE MATCH!!!!", id);
    Match.findOneAndUpdate({_id: id}, {$set: {confirmed: true}}, function (err, doc) {
      if (err) console.log("err", err);
      
      console.log("DOC", doc);
      variable = doc
    });
    return variable
    //res.status(200).send({message: "Match created successfully"})
  } catch (err) {
    //res.status(500).send(err);
    console.log("ERRRRRRRR",err);
  }
}
  


module.exports = MatchCtrl