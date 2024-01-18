const {
    selectTopics,
    selectArticleById,
    selectArticles,
    selectArticle_idComments  
} = require('../models/topics-models.js')

exports.getApi = (req, res, next) => {
    const endpoints = require('../endpoints.json')
    res.status(200).send({ endpoints })
    .catch((err) => {
        next(err)
    })
}

exports.getApiTopics = (req, res, next) => {
    
    selectTopics().then((topics) => {
        res.status(200).send({ topics })
    })
    .catch((err) => {
        
        next(err)
    })
}

exports.getArticleById = (req, res, next) => {    
    const { article_id } = req.params
    
    selectArticleById(article_id).then((article) => {
        
        res.status(200).send({ article })
    })
    .catch((err) => {
        
        next(err)
    })
}

exports.getApiArticles = (req, res, next) => {
    
    selectArticles().then((articles) => {
        
        res.status(200).send({ articles })
    })
    .catch((err) => {
        
        next(err)
    })
}

exports.getArticle_idComments = (req, res, next) => {
    
    const { article_id }  = req.params

    selectArticle_idComments(article_id).then((article) => {
        
        res.status(200).send({ article }) //array of comments
    })
    .catch((err) => {
        
        next(err)
    })
}