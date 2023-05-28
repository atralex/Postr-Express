import LoginUser from "./loginUser.model";
import {db} from "../dbConnection/dbUseCases";

export const login = {
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