const data = require('../data/db.json');  // Replace this with the location of your db.json

module.exports = (req, res) => {
    res.status(200).send(data.posts);
};