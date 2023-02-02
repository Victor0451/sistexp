import React, { useEffect, useState } from "react";
import Layout from "../../components/Layouts/Layout";
import jsCookie from "js-cookie";
import moment from "moment";
import axios from "axios";
import toastr from "toastr";
import Router from "next/router";
import FormAgenda from '../../components/Agenda/FormAgenda'
import ModalEvent from "../../components/Agenda/ModalEvent";
import { v4 as uuidv4 } from 'uuid';
import { registrarHistoria } from '../../utils/funciones'

const Agenda = () => {

    let priorityRef = React.createRef()
    let userRef = React.createRef()
    let detailRef = React.createRef()

    const [user, guardarUsuario] = useState(null)
    const [events, saveEvents] = useState([])
    const [eventSelected, saveEventSelected] = useState([])
    const [edit, saveEdit] = useState(false)
    const [delet, saveDelete] = useState(false)


    // FUNCIONES CALENDARIO

    const handleDateSelect = (selectInfo) => {

        let title = prompt('Nombre del evento?')
        let detail = prompt('Puedes ingresar si es necesario, una descripcion mas detallada')

        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect()

        if (title != null) {

            let ev = {
                id: uuidv4(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay,
                user: user,
                detail
            }

            saveEvents([...events, ev])

            postEvent(ev)

        } else {
            toastr.warning("No registraste el evento", "ATENCION")
        }

    }

    const editEnable = () => {
        if (edit === true) {
            saveEdit(false)
            toastr.info("Modo edicion desactivado", "ATENCION")
        } else if (edit === false) {
            saveEdit(true)
            toastr.info("Modo edicion activado", "ATENCION")
        }
    }

    const deleteEnable = () => {
        if (delet === true) {
            saveDelete(false)
            toastr.info("Modo eliminacion desactivado", "ATENCION")
        } else if (delet === false) {
            saveDelete(true)
            toastr.info("Modo eliminacion activado", "ATENCION")
        }
    }

    const selEvent = (eventInfo) => {

        if (edit === true && delet === false) {

            let evE = {
                id: eventInfo.event.id,
                title: eventInfo.event.title,
                start: moment(eventInfo.event.start).format('YYYY-MM-DD HH:mm:ss'),
                end: moment(eventInfo.event.end).format('YYYY-MM-DD HH:mm:ss'),
                allDay: eventInfo.event.allDay,

            }

            putEvent(evE)

        } else if (edit === false && delet === false) {

            saveEventSelected(eventInfo.event)

            let myModal = new bootstrap.Modal(document.getElementById('modalVista'))
            myModal.show()

        } else if (edit === false && delet === true) {

            deleteEvents(eventInfo.event.id)

        }
    }

    // --------------------------------------

    // APIS

    const getEvents = async () => {

        await axios.get(`/api/agenda/agenda`)
            .then(res => {

                if (res.data.msg === 'Eventos Encontrados') {

                    saveEvents(res.data.body)

                } else if (res.data.msg === 'No hay Eventos') {

                    toastr.info("No hay eventos registrados", "ATENCION")

                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    const postEvent = async (data) => {

        await axios.post(`/api/agenda/agenda`, data)
            .then(res => {

                if (res.data.msg === "Evento Registrado") {

                    toastr.success("El evento se registro correctamente", "ATENCION")

                    setTimeout(() => {

                        let accion = `Se creo un nuevo evento ID: ${data.id}, titulo: ${data.title}.`

                        let id = `AG - ${data.id}`

                        registrarHistoria(accion, user, id)

                        getEvents()

                    }, 500);



                }

            })
            .catch(error => {
                console.log(error)
            })
    }

    const putEvent = async (data) => {

        await axios.put(`/api/agenda/agenda`, data)
            .then(res => {

                if (res.data.msg === "Evento Editado") {

                    toastr.success("El evento se actualizo correctamente", "ATENCION")

                    setTimeout(() => {

                        let accion = `Se edito el evento ID: ${data.id}, titulo: ${data.title}.`

                        let id = `AG - ${data.id}`

                        registrarHistoria(accion, user, id)

                        getEvents()

                    }, 500);

                }

            })
            .catch(error => {
                console.log(error)
            })


    }

    const deleteEvents = async (idev) => {

        await axios.delete(`/api/agenda/agenda`, {
            params: {
                id: idev
            }
        })
            .then(res => {

                if (res.data.msg === "Evento Eliminado") {

                    toastr.success("Evento eliminado correctamente", "ATENCION")

                    setTimeout(() => {

                        let accion = `Se elimino el evento ID: ${idev}.`

                        let idh = `AG - ${idev}`

                        registrarHistoria(accion, user, idh)

                        getEvents()

                    }, 500);
                }
            })
            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al eliminar el evento", "ATENCION")
            })

    }

    // --------------------------------------



    let token = jsCookie.get("token");

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {

            guardarUsuario(jsCookie.get("usuario"))

            getEvents()

        }
    }, []);

    return (
        <Layout>
            <FormAgenda
                events={events}
                edit={edit}
                handleDateSelect={handleDateSelect}
                selEvent={selEvent}
                editEnable={editEnable}
                priorityRef={priorityRef}
                userRef={userRef}
                detailRef={detailRef}
                delet={delet}
                deleteEnable={deleteEnable}
            />

            <ModalEvent
                evento={eventSelected}
            />
        </Layout>
    )
}

export default Agenda