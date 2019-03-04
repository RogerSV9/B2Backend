'use strict'

const express = require('express')

const app = express()

app.listen(8080, () => {
    console.log('API REST corriendo en localhost:8080')
})