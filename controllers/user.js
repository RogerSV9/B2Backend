'use strict'

const User = require('../models/user')

const UserCtrl = {}


//Register
UserCtrl.postUser = async (req, res) => {
  const user = new User()
  console.log(user)
  
  user.name = req.body.name
  user.username = req.body.username
  user.email = req.body.email
  user.password = req.body.password

  try {
    await user.save();
    res.status(200).send({message: "User created successfully"})
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
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
  console.log("entra")
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
  console.log("Update")
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
  console.log("Delete")
  try {
    console.log("Id " +req.params._id)
   /* const _id2 = mongoose.Types.ObjectId(req.params._id) */
   const _id= req.params._id;
   console.log("Id " +_id)
    let user = await User.findByIdAndRemove(_id)
    console.log(user);
    console.log("user " +user)
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
UserCtrl.addMatch = async (req, res) => {
  try {
    const userSourceId = req.body.userSourceId
    const userDestId = req.body.userDestId

    console.log(`userSourceId: ${userSourceId}, userDestId: ${userDestId}`)

    let userDestFound = await User.findById(userDestId)

    if (!userDestFound) {
      return res.status(404).send({message: 'Destination user not found'})
    } else {
      let matchUpdated = await User.findByIdAndUpdate({_id: userSourceId}, {$addToSet: {users: userDestId}})
      if (!matchUpdated) {
        return res.status(404).send({message: 'Source user not found'})
      }
    }

  } catch (err) {

  }
}



//Login
UserCtrl.signIn = async (req, res) => {
  /* console.log("Body email" +req.body.username);
    console.log("Params email" +req.params.username);
    console.log("Body passw" +req.body.password);
  User.findOne({ username: req.body.username }, (err, user) => {
    console.log("User" +user);
      if (err) return res.status(500).send ({ message: err})
      if (user.length === 0) return res.status(404).send({ message: 'No existe el usuario'})
      if (!user) {
        res.status(401).send('Invalid Email')
      }
      if(user.password === req.body.password){res.status(200).send(user)}
      else res.status(404).send({message: 'Contraseña incorrecta'})
  }) */
 /* try {
   console.log("Params " +req.params.username)
   console.log("Body " +req.body.username)
   console.log("Params " +req.params.password)
   console.log("Body " +req.body.password)
   let username1 = req.body.username;
   console.log("username1 " + username1)
   let username = await User.findOne({ username: req.body.username })   
   console.log("username" +username)
   console.log("username2" +username.username)
   if (!username) {
     console.log("if")
     return res.status(404).send({message: 'Invalid username'})
   } else if (username.length === 0) {
    console.log("else if")
     return res.status(401).send({message: 'Insert a username'})
   }  
   console.log("Req.body" +req.body.password)
   console.log("Username" +username.password)
   if(username.password === req.body.password){
    console.log("if2")
     res.status(200).send(username)
     console.log("if3")
  } else {
    console.log("else")
     res.status(404).send({message: 'Incorrect password'})
   }
 }catch (err) {
  console.log("500")
  res.status(500).send(err)
 }
} */
try {
  console.log("Params " +req.params.username)
  console.log("Body " +req.body.username)
  console.log("Params " +req.params.password)
  console.log("Body " +req.body.password)
  let username1 = req.body.username;
  console.log("username1 " + username1)
  let username = await User.findOne({ username: req.body.username })   
  console.log("username" +username)
  console.log("username2" +username.username)
  if (!username) {
    console.log("if")
    return res.status(404).send({message: 'Invalid username'})
  } else if (username.length === 0) {
   console.log("else if")
    return res.status(401).send({message: 'Insert a username'})
  }  
  console.log("Req.body" +req.body.password)
  console.log("Username" +username.password)
  if(username.password === req.body.password && username.category=== "admin"){
   console.log("if2")
    res.status(200).send(username)
    console.log("if3")
 }
 else if(username.category != "admin"){
  res.status(401).send({message: 'Unauthorized'})
 }
  else {
   console.log("else")
    res.status(404).send({message: 'Incorrect password'})
  }
}catch (err) {
 console.log("500")
 res.status(500).send(err)
}
}


/* //Register
UserCtrl.register = async (req, res) => {
  const user = new User({
    name: req.body.name,
    username: req.body.username,
    email: req.body.email, 
    password: req.body.password
  })

  try {
    await user.save()
    res.status(200).send({message: 'User registered succesfully'})
  } catch (err) {
    res.status(500).send(err)
    console.log(err)
  }

  console.log(user)
}
 */


module.exports = UserCtrl
