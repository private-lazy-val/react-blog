const data = require('../data/db.json');

module.exports = (req, res) => {
    res.status(200).send(data.posts);
};