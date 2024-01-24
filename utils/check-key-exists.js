const db = require('../db/connection.js')

exports.checkArticleExists = (article_id) => {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1", [article_id]
      )
      .then(({ rows }) => {
        if (rows.length ===0) {
          return Promise.reject({ status: 404, msg: "Not found"});
        }
      });
  };

exports.checkCommentExists = (comment_id) => {
  return db
    .query("SELECT * FROM comments WHERE article_id = $1", [comment_id]
    )
    .then(({ rows }) => {
      if (rows.length ===0) {
        return Promise.reject({ status: 404, msg: "Not found"});
      }
    });
};
