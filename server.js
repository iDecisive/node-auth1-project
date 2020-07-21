const express = require('express');

const api = require('./usersModel');
const e = require('express');

const bcrypt = require('bcrypt');

const server = express();

server.use(express.json());

const PORT = 8000;

//res.status(500).json({ message: 'Server error', error: error });

server.post('/api/register', (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).json({ message: 'Enter a username and a password' });
	} else {
        
        let hashedPass = bcrypt.hashSync(req.body.password, 12);

		api
			.register({
                username: req.body.username,
                password: hashedPass
            })
			.then((returned) => {
				res.status(201).json({
					message: 'Created new account!',
					returned: returned[0],
				});
			})
			.catch((error) => {
				res.status(500).json({ message: 'Server error', error: error });
			});
	}
});

server.post('/api/login', (req, res) => {});

server.get('/api/users', (req, res) => {});

server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
