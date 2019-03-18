'use strict'

const User = require('../models/user')


//Create user
function createUser(req, res){
    console.log(req.body)
    let user = new User()
    user.name = req.body.name
    user.surname = req.body.surname
    user.username = req.body.username
    user.password = req.body.password
    user.email = req.body.email
    user.signUpDate = req.body.signUpDate
    user.lastLogin = req.body.lastLogin
    user.age = req.body.age
    user.picture = req.body.picture
    user.description = req.body.description
    user.localization = req.body.localization
    user.premium = req.body.premium
    user.tag = req.body.tag

    user.save((err, userStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({user: userStored})
    })
}



//Get all users
function getUsers(req, res){
    User.find({}, (err, users)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!users) return res.status(404).send({message: `No existen productos`})
        
        res.status(200).send(users);
    })
}


//Get one user by username
function getUser1 (req, res){
    let username = req.params.username

    User.findOne(username, (err, user) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!user) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({user})
    })
}


//Get one user by ID
function getUser2 (req, res) {
    let id = req.params._id
      User.findById(id, (err, user)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!user) return res.status(404).send({message: `No existe él ususario`})
  
        res.status(200).send(user)
      })
    }



//Update user
function updateUser (req, res) {
    User.findOneAndUpdate(req.body._id, req.body, {new: true}, function (err, user) {
      if(err) console.log(err)
      res.status(200).send(user)
    });
  };


//Delete user
function deleteUser (req, res) {
    let userId = req.body._id
 
    User.findById(userId, (err, user) => {
      if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
 
      user.deleteUser(err => {
        if(err) res.status(500).send({message: `Error al borrar el producto: ${err}`})
        res.status(200).send({message: 'El producto ha sido eliminado'})
      })
    })
   };




//Sign In
function signin (req, res) {
  User.find({ email: req.body.email }, (err, user) => {
      console.log(!user)
      console.log(user )
      if (err) return res.status(500).send ({ message: err})
      if (user.length === 0) return res.status(404).send({ message: 'No existe el usuario'})

      res.user = user
      res.status(200).send({
          message: 'Te has logueado correctamente',
          //token: service.createToken(user)
      })
  })
}   


module.exports = {
    createUser,
    getUsers,
    getUser1,
    getUser2,
    updateUser,
    deleteUser,
    signin    
}