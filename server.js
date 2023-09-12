const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

// Custom route for the homepage
server.get('/', (req, res) => {
    res.send('<h1>Welcome to My API</h1><p>Available routes: /posts</p>');
});

// Use middlewares and router
server.use(middlewares);
server.use(router);

// Start the server
server.listen(port);