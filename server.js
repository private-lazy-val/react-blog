const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Custom route for the homepage
server.get('/', (req, res) => {
    res.send('<h1>Welcome to Pekingese Corner API</h1>' +
        '<p>Available routes: ' +
        '<a href="https://pekingese-blog-8ceaec0c8c78.herokuapp.com/posts">/posts</a>' +
        '<a href="https://pekingese-blog-8ceaec0c8c78.herokuapp.com/users">/users</a>' +
        '</p>');
});

// Use middlewares and router
server.use(middlewares);
server.use(router);

// Start the server
server.listen(port);