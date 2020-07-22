const express = require('express');

const api = require('./usersModel');

const authRouter = require('./auth/authRouter');

const bcrypt = require('bcrypt');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const server = express();

const auth = require('./auth/authMiddleware.js');

const PORT = 8000;

const dbConnection = require('./usersConfig.js');

const sessionConfig = {
	name: 'session',
	secret: process.env.SESSION_SECRET || 'key',
	cookie: {
		maxAge: 1000 * 60 * 10,
		secure: process.env.USE_SECURE_COOKIES || false,
		httpOnly: true,
	},
	resave: false,
	saveUninitialized: true,
	store: new KnexSessionStore({
		knex: dbConnection,
		tablename: 'sessions',
		sidfieldname: 'sid',
		createtable: true,
		clearInterval: 1000 * 60 * 30,
	}),
};

server.use(express.json());
server.use(session(sessionConfig));
server.use(helmet());
server.use(cors());
//server.use(authRouter, auth);

server.post('/api/register', (req, res) => {
	if (!req.body.username || !req.body.password) {
		res.status(400).json({ message: 'Enter a username and a password' });
	} else {
		let hashedPass = bcrypt.hashSync(req.body.password, 12);

		api
			.register({
				username: req.body.username,
				password: hashedPass,
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

server.post('/api/login', (req, res) => {
	api
		.getUserByUsername(req.body.username)
		.then((found) => {
			if (found && bcrypt.compareSync(req.body.password, found.password)) {
				req.session.loggedIn = true;
				req.session.username = req.body.username;

				res
					.status(200)
					.json({ message: 'Successfully looged in!', session: req.session });
			} else {
				res.json({ message: 'Incorrect username or password' });
			}
		})
		.catch((error) => {
			res.status(500).json({ message: 'Server error', error: error });
		});
});

server.get('/api/users', (req, res) => {
	api
		.getAllUsers()
		.then((returned) => {
			res.json(returned);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Server error', error: error });
		});
});


server.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
