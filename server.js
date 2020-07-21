const express = require('express');

const db = require('./usersConfig.js');

const server = express();

server.use(express.json());

const PORT = 8000;

//res.status(500).json({ message: 'Server error', error: error });

server
	.post('/api/register', (req, res) => {
        res.json({message: 'ok!'});
    });

server
	.post('/api/login', (req, res) => {});

server
	.get('/api/users', (req, res) => {});

server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
