import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerProductos(req, res) {

    const { method } = req

    if (method === "GET") {

        if (req.query.f && req.query.f === 'nexp') {

            try {

                const result = await excuteQuery({

                    query: `SELECT idexpediente 
                            FROM expedientes     
                            ORDER BY idexpediente DESC                      
                            `,

                });


                if (result[0]) {

                    res.json({
                        msg: "NEXP Encontrado",
                        body: result[0]
                    })

                } else if (!result[0]) {


                    res.json({
                        msg: "No hay Expedientes",
                        body: 1
                    })

                }

            } catch (error) {
                console.log(error);
            }

        } else if (req.query.f && req.query.f === 'listexp') {

            try {

                const result = await excuteQuery({

                    query:
                        `
                    SELECT 
                        e.idexpediente,
                        e.idcliente,
                        e.iddenunciado,
                        CONCAT(c.apellido, ', ', c.nombre) 'cliente',
                        CONCAT(d.apellido, ', ', d.nombre) 'denun',
                        e.nexpediente,
                        e.fecha_inicio,
                        e.estado,
                        e.descripcion,
                        e.operador,
                        e.caratula,
                        e.nexpfisico
                    FROM expedientes as e
                    INNER JOIN clientes as c on c.idcliente = e.idcliente
                    INNER JOIN denunciados as d on d.iddenunciado = e.iddenunciado
                    
                    `,

                });

                if (result[0]) {

                    res.json({
                        msg: "Expedientes Encontrados",
                        body: result
                    })

                } else if (!result[0]) {

                    res.json("No hay Expedientes")

                }

            } catch (error) {
                console.log(error);
            }

        }

    } else if (method === "POST") {

        const exp = {

            fecha_carga: req.body.fecha_carga,
            fecha_inicio: req.body.fecha_inicio,
            nexpediente: req.body.nexpediente,
            nexpfisico: req.body.nexpfisico,
            caratula: req.body.caratula,
            ano: req.body.ano,
            idcliente: req.body.idcliente,
            operador: req.body.operador,
            descripcion: req.body.descripcion,
            iddenunciado: req.body.iddenunciado,
            estado: req.body.estado,

        }

        try {

            const result = await excuteQuery({
                query: `INSERT INTO expedientes 
                        (fecha_inicio, nexpediente, ano, idcliente, operador, descripcion, iddenunciado, estado, fecha_carga, nexpfisico, caratula) 
                        VALUES('${exp.fecha_inicio}', '${exp.nexpediente}', ${exp.ano}, ${exp.idcliente}, '${exp.operador}', '${exp.descripcion}', ${exp.iddenunciado}, ${exp.estado}, '${exp.fecha_carga}', '${exp.nexpfisico}', '${exp.caratula}')`,

            });


            if (result) {
                res.json({
                    msg: "Expediente Registrado",
                    body: result
                })
            }


        } catch (error) {
            console.log(error);
        }

        return exp;

    } else if (method === "PUT") {


        if (req.body.f && req.body.f === 'edicion') {

            let exp = {

                fecha_inicio: req.body.fecha_inicio,
                nexpfisico: req.body.nexpfisico,
                caratula: req.body.caratula,
                idcliente: req.body.idcliente,
                descripcion: req.body.descripcion,
                iddenunciado: req.body.iddenunciado,
                id:req.body.id

            }

            try {

                const result = await excuteQuery({
                    query: `
                    
                        UPDATE expedientes 
                        SET fecha_inicio = '${exp.fecha_inicio}', 
                            nexpfisico = '${exp.nexpfisico}',
                            caratula= '${exp.caratula}',
                            idcliente = ${exp.idcliente},
                            descripcion = '${exp.descripcion}',
                            iddenunciado = ${exp.iddenunciado}                           
                        WHERE idexpediente = ${exp.id}
                        
                        `


                });

                if (result) {
                    res.json({
                        msg: "Expediente Editado",
                        body: result
                    })

                }

            } catch (error) {
                console.log(error);

            }

            return exp;


        } if (req.body.f && req.body.f === 'baja') {

            let datos = {
                id: req.body.id,
                estado: req.body.estado,
                fecha_baja: req.body.fecha_baja
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE expedientes
                        SET estado = ${datos.estado}, 
                            fecha_baja = '${datos.fecha_baja}'
                        WHERE idexpediente = ${datos.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Expediente Baja",
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
            }

            try {

                const result = await excuteQuery({
                    query: `
                        UPDATE expedientes
                        SET estado = ${datos.estado}, 
                            fecha_baja = NULL
                        WHERE idexpediente = ${datos.id}
                        `
                });

                if (result) {
                    res.json({
                        msg: "Expediente Activado",
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
