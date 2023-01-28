import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import FormNuevoCliente from '../../components/Clientes/FormNuevoCliente'

const Nuevo = () => {

    let apellidoRef = React.createRef()
    let nombreRef = React.createRef()
    let dniRef = React.createRef()
    let direccionRef = React.createRef()
    let telefonoRef = React.createRef()
    let nacimientoRef = React.createRef()
    let mailRef = React.createRef()

    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [flag, guardarFlag] = useState(null)


    const existeCliente = async () => {


        const dni = dniRef.current.value

        if (dni === "") {
            toastr.info("Debes ingresar un DNI para verificar si existe", "ATENCION")
        } else {


            await axios.get('/api/clientes/cliente', {
                params: {
                    f: 'existe',
                    id: dni
                }
            })
                .then(res => {

                    if (res.data.msg === "Cliente Encontrado") {

                        if (res.data.body[0].estado === 1) {

                            toastr.warning("El cliente ya esta registrado y esta activo", "ATENCION")

                        } else if (res.data.body[0].estado === 0) {

                            toastr.warning("El cliente ya esta registrado y esta dado de baja", "ATENCION")

                        }


                    } else if (res.data === "No hay Cliente") {

                        toastr.info("Puedes registrar a este cliente", "ATENCION")

                        guardarFlag(true)

                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const registrarCliente = async () => {

        guardarErrores(null)

        const cliente = {
            apellido: apellidoRef.current.value,
            nombre: nombreRef.current.value,
            dni: dniRef.current.value,
            direccion: direccionRef.current.value,
            telefono: telefonoRef.current.value,
            nacimiento: nacimientoRef.current.value,
            mail: mailRef.current.value,
            fecha_alta: moment().format('YYYY-MM-DD HH:mm:ss'),
            estado: 1

        }

        if (cliente.apellido === "") {

            guardarErrores("Debes ingresar un apellido")

        } else if (cliente.nombre === "") {

            guardarErrores("Debes ingresar un nombre")

        } else if (cliente.dni === "") {


        } else {

            await axios.post('/api/clientes/cliente', cliente)

                .then(res => {

                    if (res.data.msg === "Cliente Registrado") {

                        toastr.success("Cliente registrado", "ATENCION")

                        let accion = `Se registro el cliente id:  ${res.data.body.insertId}, ${cliente.apellido}, ${cliente.nombre}, DNI ${cliente.dni}.`

                        let id = `CL -  ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {

                            Router.push('/clientes/listado')

                        }, 500);
                    }
                })
                .catch(error => {
                    console.log(error)
                })

        }

    }


    let token = jsCookie.get("token")

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

        }
    }, []);




    return (
        <Layout>
            <FormNuevoCliente
                errores={errores}
                flag={flag}
                apellidoRef={apellidoRef}
                nombreRef={nombreRef}
                dniRef={dniRef}
                direccionRef={direccionRef}
                telefonoRef={telefonoRef}
                nacimientoRef={nacimientoRef}
                mailRef={mailRef}
                existeCliente={existeCliente}
                registrarCliente={registrarCliente}
            />
        </Layout>
    )
}

export default Nuevo