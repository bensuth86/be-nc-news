const db = require('../db/connection.js')

exports.selectTopics = () => {
    return db.query('SELECT * FROM topics;').then((result) => {
        
        return result.rows
    })
}

exports.selectArticleById = (article_id) => {
    return db.
        query('SELECT * FROM articles WHERE article_id = $1;', [article_id])
        .then((result) => {
            if (result.rows.length === 0) {

                return Promise.reject()
            }
            return result.rows[0]
    })
}

// exports.selectArticles = () => {
//     return db.query('SELECT *, C.cnt FROM articles LEFT JOIN (SELECT article_id, COUNT(article_id) AS count FROM comments GROUP by article_id) C ON articles.article_id = comments.article_id;')
                    
//     .then((result) => {        
//         return result.rows
//     })
// }

exports.selectArticles = () => {
    return db.query('SELECT * FROM articles LEFT JOIN (SELECT article_id, count(article_id) AS totalComments FROM comments GROUP by article_id) AS ctn ON ctn.article_id = articles.article_id;')
                    
    .then((result) => {        
        return result.rows
    })
}

// Joins
// Aggregate functions