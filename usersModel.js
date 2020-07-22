const db = require('./usersConfig.js');

const register = (obj) => {

    return db('users').insert(obj);

}

function getAllUsers() {
	return db('users').select('id', 'username');
}

function getUserById(id) {
	return db('users').where({ id }).first();
}

function getUserByUsername(username) {
    	return db('users').where({ username }).first();
}

module.exports = {

    register,
    getAllUsers,
    getUserById,
    getUserByUsername

}