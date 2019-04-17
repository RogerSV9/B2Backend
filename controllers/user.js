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
  try {
  console.log(req.params.id)
  const user = await User.findById(req.params.id)
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
    const _id = req.params.userId
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
    const _id = mongoose.Types.ObjectId(req.params.userId)

    let user = await User.findByIdandDelete(_id)
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
 try {
   console.log(req.params.username)
   let username = await User.findOne(req.params.username)   
   console.log(username)
   if (!username) {
     return res.status(404).send({message: 'Invalid username'})
   } else if (user.length === 0) {
     return res.status(401).send({message: 'Insert a username'})
   }  
   console.log(req.body.password)
   console.log(user.password)
   if(user.password === req.body.password){
     res.status(200).send(user)
  } else {
     res.status(404).send({message: 'Incorrect password'})
   }
 }catch (err) {
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
