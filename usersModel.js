const db = require('./usersConfig.js');

const register = (obj) => {

    return db('users').insert(obj);

}

module.exports = {

    register

}