import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {

        if (req.query.f && req.query.f === 'clientes') {

            try {

                const result = await excuteQuery({

                    query: `SELECT * 
                            FROM clientes 
                            WHERE estado = 1
                            `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Clientes Encontrados",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Clientes")

                }

            } catch (error) {
                console.log(error);
            }

        } else if (req.query.f && req.query.f === 'existe') {

            try {

                const result = await excuteQuery({

                    query: `SELECT * FROM clientes 
                    WHERE dni = ${req.query.id}
                    `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Cliente Encontrado",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Cliente")

                }

            } catch (error) {
                console.log(error);
            }

        } else if (req.query.f && req.query.f === 'listclien') {

            try {

                const result = await excuteQuery({

                    query:
                        `
                    SELECT 
                        idcliente 'value',
                        CONCAT(apellido, ', ', nombre) 'label'
                    FROM clientes 
                    
                    `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Listado Generado",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json({
                        msg: "No hay Clientes"
                    })

                }

            } catch (error) {
                console.log(error);
            }


        } else if (req.query.f && req.query.f === 'busclien') {

            try {

                const result = await excuteQuery({

                    query:
                        `
                    SELECT *
                    FROM clientes 
                    WHERE idcliente = ${req.query.id}
                    
                    `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Cliente Encontrado",
                        body: result[0]
                    })

                } else if (!result[0]) {

                    res.json({
                        msg: "No hay Cliente"
                    })

                }

            } catch (error) {
                console.log(error);
            }


        }

    } else if (method === "POST") {

        const cliente = {
            apellido: req.body.apellido,
            nombre: req.body.nombre,
            dni: req.body.dni,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            nacimiento: req.body.nacimiento,
            mail: req.body.mail,
            fecha_alta: req.body.fecha_alta,
            estado: req.body.estado,
        }

        try {

            const result = await excuteQuery({
                query: `INSERT INTO clientes 
                        (apellido, nombre, dni, direccion, telefono, nacimiento, mail, fecha_alta, estado) 
                        VALUES('${cliente.apellido}', '${cliente.nombre}', ${cliente.dni}, '${cliente.direccion}', ${cliente.telefono}, '${cliente.nacimiento}', '${cliente.mail}', '${cliente.fecha_alta}', ${cliente.estado})`,

            });


            if (result) {
                res.json({
                    msg: "Cliente Registrado",
                    body: result
                })
            }


        } catch (error) {
            console.log(error);
        }

        return cliente;

    } else if (method === "PUT") {

        if (req.body.f && req.body.f === 'edicion') {

            let datos = {
                apellido: req.body.apellido,
                nombre: req.body.nombre,
                dni: req.body.dni,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                nacimiento: req.body.nacimiento,
                mail: req.body.mail,
                id: req.body.id

            }

            try {

                const result = await excuteQuery({
                    query: `UPDATE clientes 
                        SET apellido = '${datos.apellido}', 
                            nombre = '${datos.nombre}',
                            dni= ${datos.dni},
                            telefono = ${datos.telefono},
                            direccion = '${datos.direccion}',
                            nacimiento = '${datos.nacimiento}',
                            mail = '${datos.mail}'
                        WHERE idcliente = ${datos.id}`


                });

                if (result) {
                    res.json({
                        msg: "Cliente Editado",
                        body: result
                    })

                }

            } catch (error) {
                console.log(error);

            }

            return datos;


        } if (req.body.f && req.body.f === 'baja') {

            let datos = {
                id: req.body.id,
                estado: req.body.estado,
                fecha_baja: req.body.fecha_baja
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE clientes
                        SET estado = ${datos.estado}, 
                            fecha_baja = '${datos.fecha_baja}'
                        WHERE idcliente = ${datos.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Cliente Baja",
                        body: result
                    })
                }

            } catch (error) {
                console.log(error);

            }

            return datos;


        } else if (req.body.f && req.body.f === 'activar') {

            let datos = {
                id: req.body.id,
                estado: req.body.estado,
                reactivacion: req.body.reactivacion
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE clientes
                        SET estado = ${datos.estado}, 
                            reactivacion = '${datos.reactivacion}'
                        WHERE idcliente = ${datos.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Cliente Activado",
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
