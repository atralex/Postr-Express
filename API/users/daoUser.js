const db = require('../dbConnection/dbUseCases');
const User = require('./user.model');

const daoUser = {
    getUsers: async () => {
        let newUsers = [];
        let users = await db.getAllUsers();
        console.log(users);
        users.map((user) => {
            let newUser = new User(user.id, user.username, user.pdw);
            newUsers.push(newUser);
        });
        return newUsers;
    },
}

module.exports = daoUser;