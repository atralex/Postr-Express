import pool from "./dbConnection";
import {json} from "express";

export const db = {
    getAllUsers: async () => {
        let conn = await pool.getConnection();
        try {
            const listaDeUsuarios = await conn.execute('SELECT * FROM usuarios');
            return json(listaDeUsuarios);
        } catch (err) {
            console.error(err);
            return (status(500).json({ error: 'Error al obtener los datos de la base de datos' }));
        } finally {
            if (conn) await conn.end();
        }
    },

    login: async (username, pdw) => {
        let conn = await pool.getConnection()
        try{
            const resultadoLogin = await conn.execute('SELECT * FROM `usuarios` WHERE username=? AND pdw=?;', [username, pdw]);
            if (resultadoLogin.length !== 0){
                return json({status:'Login Exitoso', usuario: username})
            }
        } catch (err) {
            return status(500).json(err= 'Error al hacer login')
        } finally {
            if (conn) await conn.end()
        }
    },
}