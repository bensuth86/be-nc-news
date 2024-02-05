const express = require('express')
const app = express()
const cors = require('cors')
const { getApi,
    getApiTopics,
    getApiUsers,
    getArticleById,
    getApiArticles,
    getArticle_idComments,
    postCommentToArticleId,
    patchVotesArticles,
    deleteCommentById,
    getApiArticlesFiltered
    } = require('./controllers/topics-controllers.js')
const { handlePsqlErrors,
        handleServerErrors,        
        handle404NotFound
        } = require('./errors/index.js')

app.use(cors())
app.use(express.json());

app.get('/api', getApi)
app.get('/api/topics', getApiTopics)
app.get('/api/users', getApiUsers)

app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getApiArticles)
app.get('/api/articles/:article_id/comments', getArticle_idComments)

app.post('/api/articles/:article_id/comments', postCommentToArticleId)
app.patch('/api/articles/:article_id', patchVotesArticles)

app.delete('/api/comments/:comment_id', deleteCommentById)

app.all('*', (req, res) => {
    
    res.status(404).send({ msg: 'Not found' })
})

//Error handling middleware ...

app.use(handlePsqlErrors)
app.use(handle404NotFound)
app.use(handleServerErrors)


module.exports = app

// TODO
// ADVANCED ERRORS
// - utility function to check if category exists
// - modify promise rejects in models to use util function
// - api/articles/1/comments #5 test for return 200 when article_id exists but has no comments
