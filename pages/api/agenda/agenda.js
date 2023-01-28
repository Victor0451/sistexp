import excuteQuery from '../../../config/db';
import moment from 'moment';

export default async function handlerAgenda(req, res) {

    const { method } = req

    if (method === "GET") {



        try {

            const result = await excuteQuery({

                query: `SELECT * 
                            FROM agenda                             
                            `,

            });

            if (result[0]) {

                res.json({
                    msg: "Eventos Encontrados",
                    body: result
                })

            } else if (!result[0]) {

                res.json({
                    msg: "No hay Eventos"
                })

            }

        } catch (error) {
            console.log(error);
        }


    } else if (method === "POST") {

        let ev = {
            id: req.body.id,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            allDay: req.body.allDay,
            user: req.body.user,
            detail: req.body.detail,
        }

        try {

            const result = await excuteQuery({
                query: `INSERT INTO agenda 
                        (id, start, end, allDay, title, user, detail) 
                        VALUES('${ev.id}', '${ev.start}', '${ev.end}', ${ev.allDay}, '${ev.title}', '${ev.user}', '${ev.detail}')`,

            });


            if (result) {
                res.json({
                    msg: "Evento Registrado",
                    body: result
                })
            }


        } catch (error) {
            console.log(error);
        }

        return ev;

    } else if (method === "PUT") {



        let evE = {
            id: req.body.id,
            title: req.body.title,
            start: req.body.start,
            end: req.body.end,
            allDay: req.body.allDay,

        }

        try {

            const result = await excuteQuery({
                query:
                    `                        
                        UPDATE agenda 
                        SET title = '${evE.title}', 
                            start = '${evE.start}',
                            end= '${evE.end}',
                            allDay = ${evE.allDay}                            
                        WHERE id = '${evE.id}'
                        
                        `


            });

            if (result) {
                res.json({
                    msg: "Evento Editado",
                    body: result
                })

            }

        } catch (error) {
            console.log(error);

        }

        return evE;

    } else if (method === "DELETE") {

        try {

            const result = await excuteQuery({
                query:
                    `                        
                        DELETE 
                        FROM agenda                         
                        WHERE id = '${req.query.id}'
                        
                        `
            });


            if (result) {
                res.json({
                    msg: "Evento Eliminado"
                })
            }

        } catch (error) {
            console.log(error);

        }


    }



}
