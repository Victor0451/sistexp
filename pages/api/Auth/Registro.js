import crypto from 'crypto';
import excuteQuery from '../../../config/db';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';


export default async function handlerUser(req, res) {

    const { method } = req

    if (method === "GET") {

        if (req.query.f === "todos") {


            try {
                const result = await excuteQuery({
                    query: 'SELECT * FROM usuarios ',

                });


                if (result[0]) {

                    res.json({
                        msg: "Usuarios Encontrados",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Usuarios")

                }

            } catch (error) {
                console.log(error);
            }


        } else {

            try {
                const result = await excuteQuery({
                    query: 'SELECT * FROM usuarios WHERE usuario = ?',
                    values: [req.query.usuario],
                });

                if (result[0]) {
                    const inputHash = crypto
                        .pbkdf2Sync(req.query.contrasena, result[0].salt, 1000, 64, 'sha512')
                        .toString('hex');


                    if (result[0].hash === inputHash) {

                        res.json({
                            msg: "Usuario Valido",
                            body: result[0],
                            token: uuidv4()
                        })




                    } else if (result[0].hash !== inputHash) {

                        res.json("Contraseña Invalida")

                    }


                } else if (!result[0]) {

                    res.json("Usuario Inexistente")

                }

            } catch (error) {
                console.log(error);
            }


        }

    } else if (method === "POST") {
        try {
            const result = await excuteQuery({
                query: 'SELECT * FROM usuarios WHERE usuario = ?',
                values: [req.body.usuario],
            });

            if (result[0]) {
                res.json("Usuario Existente")
            } else {

                const salt = crypto.randomBytes(16).toString('hex');
                const hash = crypto
                    .pbkdf2Sync(req.body.contrasena, salt, 1000, 64, 'sha512')
                    .toString('hex');
                const user = {
                    usuario: req.body.usuario,
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    alta: req.body.alta,
                    estado: req.body.estado,
                    hash,
                    salt

                };

                try {
                    const result = await excuteQuery({
                        query: 'INSERT INTO usuarios (usuario, nombre, apellido, hash, salt, estado, alta) VALUES(?, ?, ?, ?, ?, ?, ?)',
                        values: [user.usuario, user.nombre, user.apellido, user.hash, user.salt, user.estado, user.alta],
                    });

                    if (result) {
                        res.json({
                            msg: "Usuario Registrado",
                            body: result
                        })
                    }

                } catch (error) {
                    console.log(error);
                }

                return user;

            }

        } catch (error) {
            console.log(error);
        }

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'edicion') {

            let datos = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                id: req.body.id
            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE usuarios 
                            SET nombre = '${datos.nombre}', 
                                apellido = '${datos.apellido}'                        
                            WHERE idusuario = ${datos.id}`


                });

                console.log(result)

                if (result) {
                    res.json({
                        msg: "Usuario Editado",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return datos;


        } if (req.body.f && req.body.f === 'baja') {

            let datos = {
                estado: req.body.estado,
                baja: req.body.baja,
                id: req.body.id
            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE usuarios 
                            SET estado = ${datos.estado}, 
                                baja = '${datos.baja}'                        
                            WHERE idusuario = ${datos.id}`


                });

                console.log(result)

                if (result) {
                    res.json({
                        msg: "Usuario Baja",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return datos;


        } if (req.body.f && req.body.f === 'contrasena') {

            let datos = {
                contrasena: req.body.contrasena,
                id: req.body.id
            }

            try {

                const salt = crypto.randomBytes(16).toString('hex');
                const hash = crypto
                    .pbkdf2Sync(req.body.contrasena, salt, 1000, 64, 'sha512')
                    .toString('hex');

                const result = await excuteQuery({
                    query: `UPDATE usuarios 
                            SET salt = '${salt}',
                            hash = '${hash}'                                               
                            WHERE idusuario = ${datos.id}`


                });

                console.log(result)

                if (result) {
                    res.json({
                        msg: "Usuario Contrasena",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return datos;


        } if (req.body.f && req.body.f === 'activar') {

            let datos = {
                estado: req.body.estado,
                reactivacion: req.body.reactivacion,
                id: req.body.id
            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE usuarios 
                            SET estado = ${datos.estado}, 
                                reactivacion = '${datos.reactivacion}'                        
                            WHERE idusuario = ${datos.id}`


                });

                console.log(result)

                if (result) {
                    res.json({
                        msg: "Usuario Activado",
                        body: result
                    })

                }



            } catch (error) {
                console.log(error);

            }

            return datos;


        }

    }
}

