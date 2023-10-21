const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

const html = `
    <h1>Welcome to Pekingese Corner API</h1>
    <p>Available routes:</p>
    <ul>
        <li><a href="https://pekingese-blog-8ceaec0c8c78.herokuapp.com/posts">/posts</a></li>
        <li><a href="https://pekingese-blog-8ceaec0c8c78.herokuapp.com/users">/users</a></li>
    </ul>
`;
// Custom route for the homepage
server.get('/', (req, res) => {
    res.send(html);
});

// Use middlewares and router
server.use(middlewares);
server.use(router);

// Start the server
server.listen(port);