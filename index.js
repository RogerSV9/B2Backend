'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')



mongoose.connect('mongodb://localhost:27017/b2b',{ useNewUrlParser: true },(err, req) =>{ 
     
if(err) {

    return console.log(`Error al conectar a la base de datos: ${err}`)
}
    console.log('Conexión a la base de datos establecida...')

    app.listen(config.port, () => {
        console.log(`API REST corriendo en http://localhost:${config.port}`)
    })
})