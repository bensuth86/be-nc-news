const express = require('express')
const app = express()
const {
    getApiTopics,
    getApi
    } = require('./controllers/topics-controllers.js')

const { handleCustomErrors,
        handlePsqlErrors,
        handleServerErrors
        } = require('./errors/index.js')

app.get('/api/topics', getApiTopics)
app.get('/api', getApi)

app.use(handleCustomErrors)
app.use(handlePsqlErrors)
app.use(handleServerErrors)

// app.use((req, res, next) => {
//     res.status(404).send("Not found")
//   })

module.exports = app