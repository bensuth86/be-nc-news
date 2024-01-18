const express = require('express')
const app = express()
const { getApi,
    getApiTopics,
    getArticleById,
    getApiArticles,
    getArticle_idComments
    } = require('./controllers/topics-controllers.js')

const { handlePsqlErrors,
        handleServerErrors        
        } = require('./errors/index.js')

app.get('/api', getApi)
app.get('/api/topics', getApiTopics)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getApiArticles)
app.get('/api/articles/:article_id/comments', getArticle_idComments)

app.all('*', (req, res) => {
    
    res.status(404).send({ msg: 'Not found' })
})

//Error handling middleware ...

app.use(handlePsqlErrors)
app.use(handleServerErrors)


module.exports = app

// TODO

// 1)describe('/api/articles/:article_id:
// tests for createdby and URL