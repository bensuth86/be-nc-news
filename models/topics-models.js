const db = require('../db/connection.js')

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;').then((result) => {
        
        return result.rows
    })
}

exports.selectUsers = () => {
    return db.query('SELECT * FROM users;').then((result) => {
        
        return result.rows
    })
}

exports.selectArticleById = (article_id) => {
    
    return db.
        query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
        .then((result) => {
            
            // if (result.rows.length === 0) {

            //     return Promise.reject()
            // }
            return result.rows[0]
    })
}

exports.selectArticles = (topic) => {
    
    if (topic === undefined){
        topic = '%'
    }

    return db.query('SELECT articles.*, COUNT(comments.article_id) AS comments FROM articles LEFT JOIN comments ON comments.article_id = articles.article_id WHERE topic LIKE $1 GROUP BY articles.article_id', [topic] )
    .then((result) => {
        return result.rows
    })
}

exports.selectArticle_idComments = (article_id) => {
    
    return db.query('SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC ;', [article_id])
    .then((result) => {

        return result.rows
    })
}

exports.insertCommentByArticleId = ({ body, username, article_id }) => {

    return db
        .query('INSERT INTO comments (body, author, article_id) VALUES ($1, $2, $3) RETURNING *;',
        [body, username, article_id])
        .then((result) => {

            return result.rows[0]
        })
}

exports.updateVotesByArticleId = ({ inc_votes, article_id }) => {

    return db
        .query('UPDATE articles SET votes = $1 WHERE article_id = $2 RETURNING *;', [inc_votes, article_id])
        .then((result) => {
            
            return result.rows[0]
        })
}

exports.removeCommentById = (comment_id) => {

    return db
        .query('DELETE FROM comments WHERE comment_id = $1;', [comment_id])
        
        }

