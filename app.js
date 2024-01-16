const express = require('express')
const app = express()
const { getApi,
    getApiTopics,
    getArticleById
    } = require('./controllers/topics-controllers.js')

const { handlePsqlErrors        
        } = require('./errors/index.js')

app.get('/api', getApi)
app.get('/api/topics', getApiTopics)
app.get('/api/articles/:article_id', getArticleById)

//Error handling middleware ...

app.use(handlePsqlErrors)


app.all('*', (req, res) => {
    console.log('-----> 404')
    res.status(404).send({ msg: 'Not found' })
})

module.exports = app