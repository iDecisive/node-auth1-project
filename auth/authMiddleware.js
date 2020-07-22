module.exports = (req, res, next) => {
	if (req.session && req.session.loggedIn === true) {
		next();
	} else {
		res.json({ message: 'Not logged in' });
	}
};
