import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerBitacora(req, res) {

    const { method } = req

    if (method === "GET") {



        try {

            const result = await excuteQuery({

                query: `SELECT * 
                            FROM bitacoras                             
                            `,

            });

            if (result[0]) {

                res.json({
                    msg: "Bitacoras Encontradas",
                    body: result
                })

            } else if (!result[0]) {

                res.json({
                    msg: "No hay Bitacoras"
                })

            }

        } catch (error) {
            console.log(error);
        }


    } else if (method === "POST") {

        let bit = {

            fecha: req.body.fecha,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,

        }

        try {


            const result = await excuteQuery({
                query: `INSERT INTO bitacoras 
                        (fecha, titulo, descripcion) 
                        VALUES('${bit.fecha}', '${bit.titulo}', '${bit.descripcion}')`,

            });


            if (result) {
                res.json({
                    msg: "Bitacora Registrada",
                    body: result
                })


            }


        } catch (error) {
            console.log(error);
        }

        return bit;

    } else if (method === "PUT") {



        let bit = {
            idbitacora: req.body.idbitacora,
            fecha: req.body.fecha,
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,

        }

        try {

            const result = await excuteQuery({
                query:
                    `                        
                        UPDATE bitacoras
                        SET fecha = '${bit.fecha}', 
                            titulo = '${bit.titulo}',
                            descripcion= '${bit.descripcion}'
                            
                        WHERE idbitacora = ${bit.idbitacora}
                        
                        `


            });

            if (result) {
                res.json({
                    msg: "Bitacora Editada",
                    body: result
                })

            }

        } catch (error) {
            console.log(error);

        }

        return bit;

    } else if (method === "DELETE") {

        try {

            const result = await excuteQuery({
                query:
                    `                        
                        DELETE 
                        FROM bitacoras                         
                        WHERE idbitacora = '${req.query.id}'
                        
                        `
            });


            if (result) {
                res.json({
                    msg: "Bitacora Eliminada"
                })
            }

        } catch (error) {
            console.log(error);

        }


    }



}
