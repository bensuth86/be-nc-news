const express = require('express')
const app = express()
const {
    getApiTopics
    } = require('./controllers/topics-controllers.js')

const { handleCustomErrors,
        handlePsqlErrors,
        handleServerErrors} = require('./errors/index.js')

app.use(express.json())

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/topics', getApiTopics)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

module.exports = app