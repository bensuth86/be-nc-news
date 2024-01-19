const db = require('../db/connection.js')

exports.checkCategoryExists = (category) => {
    return db
      .query("SELECT * FROM articles WHERE article_id = $1", [category]
      )
      .then(({ rows }) => {
        if (rows.length ===0) {
          return Promise.reject({ status: 404, msg: "Not found"});
        }
      });
  };

  