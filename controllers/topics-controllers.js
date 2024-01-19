const {
    selectTopics,
    selectArticleById,
    selectArticles,
    selectArticle_idComments,
    insertCommentByArticleId,
    updateVotesByArticleId  
} = require('../models/topics-models.js')

const { checkCategoryExists } = require('../utils/check-cat-exists.js')

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
    const categoryExistsQuery = checkCategoryExists(article_id)
    const fetchArticleId = selectArticleById(article_id)
    Promise.all([fetchArticleId, categoryExistsQuery])
    .then((response) => {  // response - [articlesArray, responsefromcheckcatexists]
        
        const article = response[0]
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
    const categoryExistsQuery = checkCategoryExists(article_id)
    const fetchArticleId = selectArticle_idComments(article_id)
    Promise.all([fetchArticleId, categoryExistsQuery])
    .then((response) => { // response - [commentsArray, responsefromcheckcatexists]
        const comments = response[0]
        res.status(200).send({ comments }) //array of comments
    })

    .catch((err) => {
        
        next(err)
    })
}

exports.postCommentToArticleId = (req, res, next) => {
        
    const newComment = {...req.body, ...req.params}  // comment_body, username, article_id       
    
    insertCommentByArticleId(newComment).then((comment) => {
        res.status(201).send({ comment })        
    })    
    .catch((err) => {
        
        next(err)
    })
}

exports.patchVotesArticles = (req, res, next) => {

    const updateVotes = {...req.body, ...req.params}
    
    updateVotesByArticleId(updateVotes).then((updatedRow) => {
        res.status(200).send({ updatedRow })
    })
    .catch((err) => {
        
        next(err)

    })
}