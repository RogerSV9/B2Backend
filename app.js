'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use('/b2b', api)

module.exports = app