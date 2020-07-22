const express = require('express');

const router = express.Router();

const api = require('../usersModel');

router.get('/api/users', (req, res) => {
	api
		.getAllUsers()
		.then((returned) => {
			res.json(returned);
		})
		.catch((error) => {
			res.status(500).json({ message: 'Server error', error: error });
		});
});

module.exports = router;