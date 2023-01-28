import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerHistorial(req, res) {

    const { method } = req

    if (method === "GET") {


        try {

            const result = await excuteQuery({

                query: 'SELECT * FROM historial ',

            });

            if (result[0]) {

                res.json({
                    msg: "Historial Encontrado",
                    body: result
                })

            } else if (!result[0]) {

                res.json("No hay historial")

            }

        } catch (error) {
            console.log(error);
        }

    } else if (method === "POST") {
        const hist = {
            operador: req.body.operador,
            fecha: req.body.fecha,
            accion: req.body.accion,
            idcliente: req.body.idcliente,
            id: req.body.id
        }

        try {

            const result = await excuteQuery({
                query: 'INSERT INTO historial (accion, fecha, usuario, id) VALUES(?, ?, ?, ?)',
                values: [hist.accion, hist.fecha, hist.operador, hist.id],
            });

            if (result) {
                res.json("Historial Registrado")
            }

        } catch (error) {
            console.log(error);
        }

        return hist;

    }
}