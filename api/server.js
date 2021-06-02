const express = require('express');

const configureMiddleware = require('./configureMiddleware.js');

const apiRouter = require('./apiRouter.js');

const server = express();

// normal server.use(middleware)'s has been refactored out into its own file - configureMiddleware -
configureMiddleware(server);

server.get('/', (req, res) => {
    res.send({
        api: 'Its worrrking, its wooooorking!'
    })
})

server.use('/api', apiRouter);


module.exports = server;
