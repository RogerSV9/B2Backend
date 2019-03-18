'use strict'

const express = require('express')
const bodyParser = require('body-parser')
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/api/v1', api)

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app