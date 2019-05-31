const express = require('express');
const helpet = require('helmet');

const server = express();

server.get('/', (req, res) => {
      res.send(`<h1>This is it, don't get scared now.</h1>`).json({ message: "You're doing it, Peter!"})
      .catch(err => {
            console.log(`\nERROR`, error);
            res.status(500).json({ error: 'cannot. even.' });
      })
});

module.exports = server;