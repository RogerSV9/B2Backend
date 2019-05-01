'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

const TokenCtrl = {}

//Create Token
TokenCtrl.createToken = function (user) {
    const payload = {
        sub: user._id, //userID 
        iat: moment().unix(), //FechaCraciónToken en formato unix
        exp: moment().add(14, 'days').unix(), //FechaExpiraciónToken = 14 días
    }

    //Retorna el token codificado
    return jwt.encode(payload, config.SECRET_TOKEN)    
}

//Decode Token
TokenCtrl.decodeToken = function (token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)
        
            if (payload.exp <= moment().unix()) {
                reject({
                    status: 401,
                    message: 'The token has expired'
                })
            }

        resolve(payload.sub)

        } catch (err) {
            reject ({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded
}


module.exports = TokenCtrl