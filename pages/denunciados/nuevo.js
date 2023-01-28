import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import FormNuevoDenunciado from '../../components/Denunciado/FormNuevoDenunciado'

const nuevo = () => {

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


    const existeDenun = async () => {


        const dni = dniRef.current.value

        if (dni === "") {
            toastr.info("Debes ingresar un DNI para verificar si existe", "ATENCION")
        } else {


            await axios.get('/api/denunciados/denunciado', {
                params: {
                    f: 'existe',
                    id: dni
                }
            })
                .then(res => {

                    if (res.data.msg === "Denun Encontrado") {

                        if (res.data.body[0].estado === 1) {

                            toastr.warning("El denunciado ya esta registrado y esta activo", "ATENCION")

                        } else if (res.data.body[0].estado === 0) {

                            toastr.warning("El denunciado ya esta registrado y esta dado de baja", "ATENCION")

                        }


                    } else if (res.data === "No hay Denun") {

                        toastr.info("Puedes registrar a este denunciado", "ATENCION")

                        guardarFlag(true)

                    }

                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const registrarDenun = async () => {

        guardarErrores(null)

        const denun = {
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

        if (denun.apellido === "") {

            guardarErrores("Debes ingresar un apellido")

        } else if (denun.nombre === "") {

            guardarErrores("Debes ingresar un nombre")

        } else if (denun.dni === "") {


        } else {

            await axios.post('/api/denunciados/denunciado', denun)

                .then(res => {

                    if (res.data.msg === "Denun Registrado") {

                        toastr.success("Denunciado registrado", "ATENCION")

                        let accion = `Se registro el denunciado id:  ${res.data.body.insertId}, ${denun.apellido}, ${denun.nombre}, DNI ${denun.dni}.`

                        let id = `DN -  ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {

                            Router.push('/denunciados/listado')

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
            <FormNuevoDenunciado
                errores={errores}
                flag={flag}
                apellidoRef={apellidoRef}
                nombreRef={nombreRef}
                dniRef={dniRef}
                direccionRef={direccionRef}
                telefonoRef={telefonoRef}
                nacimientoRef={nacimientoRef}
                mailRef={mailRef}
                existeDenun={existeDenun}
                registrarDenun={registrarDenun}
            />
        </Layout>
    )
}

export default nuevo