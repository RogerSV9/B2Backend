'use strict'

const User = require('../models/user')

function getUsers(req, res){
    User.find({}, (err, users)=>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!users) return res.status(404).send({message: `No existen productos`})
        
        res.status(200).send(users);
    })
}

function getUser(req, res){
    let username = req.params.username

    User.findOne(username, (err, user) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if(!user) return res.status(404).send({message: `El producto no existe`})

        res.status(200).send({user})
    })
}

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

module.exports = {
    getUsers,
    getUser,
    createUser
}