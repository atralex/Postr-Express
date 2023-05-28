import pool from "./dbConnection";
import {json} from "express";

export const db = {
    getAllUsers: async () => {
        let conn = await pool.getConnection();
        try {
            const listaDeUsuarios = await conn.execute('SELECT * FROM usuarios;');
            return json(listaDeUsuarios);
        } catch (err) {
            console.error(err);
            return (status(500).json({ error: 'Error al obtener los datos de la base de datos' }));
        } finally {
            if (conn) await conn.end();
        }
    },

    loginUser: async (username, pdw) => {
        let conn = await pool.getConnection();
        try{
            const resultadoLogin = await conn.execute('SELECT * FROM `usuarios` WHERE username=? AND pdw=?;', [username, pdw]);
            if (resultadoLogin.length !== 0){
                return json({status: 200, usuario: username});
            }
        } catch (err) {
            return status(500).json(err= 'Error al hacer login');
        } finally {
            if (conn) await conn.end();
        }
    },
    addUser: async (username, pdw) => {
        let conn = await pool.getConnection();
        try {
            await conn.execute('INSERT INTO `usuarios` (id, username, pdw) VALUES (NULL, ?, ?);', [username, pdw]);
            await conn.commit()
            return status(200).json('Exito al Registrar Usuario');
        } catch (err) {
            return status(500).json(err= 'Error al hacer login');
        } finally {
            if (conn) await conn.end();
        }
    },
    addPost: async (username, content) => {
        let conn = await pool.getConnection()
        try {
            let user = await conn.execute('SELECT * FROM usuarios WHERE username=?', [username]);
            let userId = user[0][0]
            await conn.execute('INSERT INTO tweets (`id`, `user_id`, `content`, `fecha_creacion`) VALUES (NULL, ?, ?, current_timestamp());', [userId, content]);
            await conn.commit()
            return {
                status: 200,
                message: 'Post añadido con exito'
            }
        } catch (err) {
            return status(500).json(err= 'Error al hacer login');
        } finally {
            if (conn) await conn.end();
        }
    },
    getPostByUsername: async (username) =>{
        let conn = await pool.getConnection()
        try {
            let user = await conn.execute('SELECT * FROM `usuarios` WHERE username=?;', [username]);
            let userId = user[0][0]
            return await conn.execute('SELECT * FROM `tweets` WHERE user_id=?;', [userId]);
        } catch (err) {
            return status(500).json(err= 'Error al hacer login');
        } finally {
            if (conn) await conn.end();
        }
    },
}