const json = require('express').json;
const status = require('express').status;
const pool = require('./dbConnection');

const db = {
    getAllUsers: async () => {
        let conn = await pool.getConnection();
        try {
            const listaDeUsuarios = await conn.execute('SELECT * FROM usuarios;');
            return listaDeUsuarios;
        } catch (err) {
            console.error(err);
            return (err);
        } finally {
            if (conn) await conn.end();
        }
    },

    loginUser: async (username, pdw) => {
        let conn = await pool.getConnection();
        try{
            const resultadoLogin = await conn.execute('SELECT * FROM `usuarios` WHERE username=? AND pdw=?;', [username, pdw]);
            if (resultadoLogin.length !== 0){
                return {status: 200, usuario: username};
            }
        } catch (err) {
            console.error(err);
            return (err);
        } finally {
            if (conn) await conn.end();
        }
    },
    tryGetUser: async (username) => {
      let conn = await pool.getConnection();
        try {
            const resultadoLogin = await conn.execute('SELECT * FROM `usuarios` WHERE username=?;', [username]);
            console.log(resultadoLogin)
            if (resultadoLogin.length === 0){
                console.log("no existe el usuario");
                return {status: 404};
            } else {
                return {status: 200, usuario: username};
            }
        } catch (err) {
            console.error(err);
            return (err);
        }
    },
    addUser: async (username, pdw) => {
        let conn = await pool.getConnection();
        try {
            await conn.execute('INSERT INTO `usuarios` (id, username, pdw) VALUES (NULL, ?, ?);', [username, pdw]);
            await conn.commit()
            return {status: 200, usuario: username};
        } catch (err) {
            console.error(err);
            return (err);
        } finally {
            if (conn) await conn.end();
        }
    },
    addPost: async (username, content) => {
        let conn = await pool.getConnection()
        try {
            let user = await conn.execute('SELECT * FROM usuarios WHERE username=?', [username]);
            let userId = user[0].id
            console.log(userId)
            await conn.execute('INSERT INTO tweets (`id`, `user_id`, `content`, `fecha_creacion`) VALUES (NULL, ?, ?, current_timestamp());', [userId, content]);
            await conn.commit()
            return {
                status: 200,
                message: 'Post añadido con exito'
            }
        } catch (err) {
            console.error(err);
            return (err);
        } finally {
            if (conn) await conn.end();
        }
    },
    getPostByUsername: async (username) =>{
        let conn = await pool.getConnection();
        try {
            let user = await conn.execute('SELECT * FROM `usuarios` WHERE username=?;', [username]);
            let userId = user[0].id
            console.log(userId)
            return await conn.execute('SELECT * FROM `tweets` WHERE user_id=?;', [userId]);
        } catch (err) {
            console.error(err);
            return (err);
        } finally {
            if (conn) await conn.end();
        }
    },
}

module.exports = db;