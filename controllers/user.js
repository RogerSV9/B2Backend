'use strict'

const User = require('../models/user')
const MatchCtrl = require('../controllers/match')
const service = require('../services')

const UserCtrl = {}


//Register
UserCtrl.postUser = async (req, res) => {
  console.log("name"+req.body.name)
    console.log("username"+req.body.username)
    console.log("email"+req.body.email)
    console.log("password"+req.body.password)
  const user = new User()
  console.log(user)
  
  user.name = req.body.name
  user.username = req.body.username
  user.email = req.body.email
  user.password = req.body.password
  user.age = req.body.age
  //user.category = req.body.category

  try {
    console.log("name"+req.body.name)
    console.log("username"+req.body.username)
    console.log("email"+req.body.email)
    console.log("password"+req.body.password)
    await user.save();
    return res.status(201).send({ 
      token: service.createToken(user) 
    })
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
  console.log(service.createToken(user))
}


//Get all users
UserCtrl.getUsers = async (req, res) => {
  const allusers = await User.find()
  res.json(allusers)
}

//Get one user by username
UserCtrl.getUserbyusername = async (req, res) => {
  try {
    let user = await User.findOne(req.body.username)
    if (!user) {
      return res.status(404).send({message: 'User not found'})
    } else {
      res.json(user)
    }
  }catch (err) {
    res.status(500).send(err)
  }
}

//Get one user by ID
UserCtrl.getUserbyid = async (req, res) => {
  try {
  console.log(req.params._id)
  const user = await User.findById(req.params._id)
  if (!user) {
    return res.status(404).send({message: 'User not found'})
    }else {
    res.json(user)
    }
  }catch (err) {
  res.status(500).send(err)
  }
}


//Update user
UserCtrl.updateUser = async (req, res) => {
  try {
    const _id = req.body._id
    let user = await User.findByIdAndUpdate(_id, req.body, {runValidators:true})
    if(!user){
      return res.status(400).send({message: 'User not found'})
    }else{
      res.status(200).send(user)    
      }
   }catch(err){
    if (err.name === 'MongoError' && err.code === 11000) {
      res.status(409).send({err: err.message, code: err.code})
      }
    res.status(500).send(err)
    }
  }


//Delete user
UserCtrl.deleteUser = async (req, res) => {
  try {
   const _id= req.params._id;
    let user = await User.findByIdAndRemove(_id)
    if (!user) {
      return res.status(404).send({message: 'User not found'})
    } else {            
      res.status(200).send({message: 'User deleted succesfully'})
    }
  } catch (err) {
    res.status(500).send(err)
  }
}


//Add match to a user
UserCtrl.addMatch = async function (userSourceId, userDestId, confirmed) {
  try {
    //const userSourceId = req.body.userSourceId
    //const userDestId = req.body.userDestId

    console.log(`userSourceId: ${userSourceId}, userDestId: ${userDestId}`)

    let userDestFound = await User.findById(userDestId)

    if(confirmed === true){
      let match = MatchCtrl.postMatch(userDestFound.username, true)
      await User.findByIdAndUpdate({_id: userSourceId}, {$addToSet: {matches: match._id}})
    }
    else if(confirmed === false){
      let match = MatchCtrl.postMatch(userDestFound.username, false)
      await User.findByIdAndUpdate({_id: userSourceId}, {$addToSet: {matches: match._id}})
    }

    if (!userDestFound) {
      //return res.status(404).send({message: 'Destination user not found'})
    } else {
      //let matchUpdated = await User.findByIdAndUpdate({_id: userSourceId}, {$addToSet: {matches: match._id}})
      if (!matchUpdated) {
        //return res.status(404).send({message: 'Source user not found'})
      }
      //res.status(200).send(match)
    }
  } catch (err) {

  }
}

//Accept a match from a user
UserCtrl.acceptMatch = async (req, res) => {
  try {
    const userSourceId = req.body.userSourceId
    const userDestId = req.body.userDestId

    console.log(`userSourceId: ${userSourceId}, userDestId: ${userDestId}`)

    let userDestFound = await User.findById(userDestId)
    let userSourceFound = await User.findById(userSourceId)
    let userDestmatch = await User.findById(userDestId).populate('matches')
    let matches = userDestmatch.matches
    let found = false
    matches.forEach(function (value) {
      if(value.username === userSourceFound.username){
        MatchCtrl.updateMatch(value._id)
        found = true
      }
    });
    if(found === false){
      await UserCtrl.addMatch(userSourceId, userDestId, false)
    }
    else if(found === true){
      await UserCtrl.addMatch(userSourceId, userDestId, true)
    }
let user = await User.findById(userDestId).populate('matches')
console.log("USER: "+user)
res.status(200).send(user)

    /*if (!userDestFound) {
      return res.status(404).send({message: 'Destination user not found'})
    } else {
      let matchUpdated = await User.findByIdAndUpdate({_id: userSourceId}, {$addToSet: {matches: match._id}})
      if (!matchUpdated) {
        return res.status(404).send({message: 'Source user not found'})
      }
    }*/
  } catch (err) {
      return res.status(500).send(err)
  }
}

//Update image from a user
UserCtrl.updateImage = async function (url, id) {
  try {
    console.log(url)
    console.log(id)
    await User.findByIdAndUpdate(id, {picture: url}, {runValidators:true})
   }catch(err){
    if (err.name === 'MongoError' && err.code === 11000) {
      //res.status(409).send({err: err.message, code: err.code})
      }
    //res.status(500).send(err)
    }
  }

//Get the matches from a user by ID
UserCtrl.getMatchbyid = async (req, res) => {
  try {
  const user = await User.findById(req.body._id).populate('matches')
  if (!user) {
    return res.status(404).send({message: 'User not found'})
    }else {
    res.json(user)
    }
  }catch (err) {
  res.status(500).send(err)
  }
}

//Login USER
UserCtrl.signInUser = async (req, res) => {
  try {
    console.log("username body:" +req.body.username)
    console.log("pass body:" +req.body.password)
    let username = await User.findOne({ username: req.body.username })   
    console.log(username)
    if (!username) {
      return res.status(404).send({message: 'Invalid username'})
    } else if (username.length === 0) {
      return res.status(401).send({message: 'Insert a username'})
    }  
    if(username.password === req.body.password){
      res.status(200).send({token: service.createToken(username)})
    }
    else {
      res.status(404).send({message: 'Incorrect password'})
    }
  }catch (err) {
   res.status(500).send(err)
  }
}



//Login ADMIN
UserCtrl.signInAdmin = async (req, res) => {
try {
  let username = await User.findOne({ username: req.body.username })   
  console.log(username)
  if (!username) {
    return res.status(404).send({message: 'Invalid username'})
  } else if (username.length === 0) {
    return res.status(401).send({message: 'Insert a username'})
  }  
  if(username.password === req.body.password && username.category=== "admin"){
    res.status(200).send({token: service.createToken(username)})
    console.log(token)
  }
 else if(username.category != "admin"){
  res.status(401).send({message: 'Unauthorized'})
  console.log('Unathorized')
 }
  else {
    res.status(404).send({message: 'Incorrect password'})
  }
}catch (err) {
 res.status(500).send(err)
 console.log(err)
}
}

UserCtrl.tags = async (req, res) => {
  try{
    let user = await User.findById(req.body._id)
    let usertags = user.tag
    let usermatches = await User.findById(req.body._id).populate('matches')
    let userlist = await User.find({username: { $ne: user.username}})
    let matchusers = new Array()
    usertags.forEach(function(value){
      userlist.forEach(function(value2){
        let tags = value2.tag
        tags.forEach(function(value3){
          if(value === value3){
            let found = false
            matchusers.forEach(function(value4){
              if(value2 === value4){
                found = true
              }
            })
            if(found === false){
            matchusers.push(value2)}
          }
        })
      })
    })
    /*for( var i = matchusers.length-1; i--;){
      console.log("Hola1")
      for(x in usermatches){
        console.log("Hola2")
      if ( matchusers[i].username === usermatches[x]){
      matchusers.splice(i, 1);
      console.log("Hola")
      }
      }
    }*/
    return res.status(200).send(matchusers)
  }
  catch (err){
    return res.status(500).send(err)
  }
}

module.exports = UserCtrl
