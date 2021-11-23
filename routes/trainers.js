const express = require('express');
const app = express.Router()
const path = require('path')

app.get('/', async (req, res, next) => {
    res.sendFile(path.join(__dirname, '../trainers.html'))
})

module.exports = app