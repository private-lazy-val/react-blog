const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
    const dbPath = path.resolve('./data/db.json');
    const rawData = fs.readFileSync(dbPath);
    const data = JSON.parse(rawData);

    if (req.method === 'GET') {
        res.status(200).send(data.posts);
    } else if (req.method === 'POST') {
        const newPost = req.body;
        data.posts.push(newPost);

        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
        res.status(201).send(newPost);
    } else {
        res.status(405).send('Method not allowed');
    }
};
