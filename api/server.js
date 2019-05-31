const express = require('express');
// const helmet = require('helmet');

const actionRouter = require('../data/routers/actions/actionRouter.js');
const projectRouter = require('../data/routers/projects/projectRouter.js');

const server = express();

server.use(express.json());
// server.use(helmet());

server.get('/', (req, res) => {
      res.send(`<h1>This is it, don't get scared now.</h1>`).json({ message: "You're doing it, Peter!"})
      .catch(err => {
            console.log(`\nERROR`, err);
            res.status(500).json({ error: 'cannot. even.' });
      })
});

server.use('/api/actions', actionRouter);
server.use('/api/projects', projectRouter);

module.exports = server;