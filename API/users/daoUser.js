import {db} from "../dbConnection/dbUseCases";
import User from "./user.model";
export const daoUser = {
    getUsers: async () => {
        let users = []
        let data = await db.getAllUsers();
        data.map((rawUser)=> {
            let user = new User;
            listUser(user, rawUser)
            const adaptedUser = user.getUser();
            users.push(adaptedUser);
        })
    },
}
function listUser(usuario, row) {
    usuario.setId(row[0]);
    usuario.setUsername(row[1]);
    usuario.setPdw(row[2]);
}