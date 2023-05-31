const db = require('../dbConnection/dbUseCases');
const LoginUser = require('./loginUser.model');


const login = {
    login: async (username, pdw) => {
        let newUser = new LoginUser(username, pdw);
        const responseLogin = await db.loginUser(newUser.getUsername(), newUser.getPdw());
        if(responseLogin.status === 200){
            return responseLogin
        } else {
            return {
                response: 'Usuario o Contraseña Incorrectos',
                status: 404
            }
        }
    },
}

module.exports = login;