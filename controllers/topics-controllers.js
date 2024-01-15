const {
    selectTopics
} = require('../models/topics-models.js')

exports.getApiTopics = (req, res, next) => {
    selectTopics().then((topics) => {
        res.status(200).send({ topics })
    })
}