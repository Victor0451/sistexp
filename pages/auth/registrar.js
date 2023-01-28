import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import FormRegistro from '../../components/Auth/FormRegistro'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'


const Registrar = () => {

    let usuarioRef = React.createRef()
    let contrasenaRef = React.createRef()
    let nombreRef = React.createRef()
    let apellidoRef = React.createRef()

    const [errores, guardarErrores] = useState(null)
    const [user, guardarUsuario] = useState(null)

    const registrarUsuario = async () => {

        guardarErrores(null)

        let datos = {
            usuario: usuarioRef.current.value,
            contrasena: contrasenaRef.current.value,
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value,
            estado: 1,
            alta: moment().format('YYYY-MM-DD HH:mm:ss')
        }

        if (usuarioRef.current.value === "") {

            guardarErrores("Debes ingresar el usuario")

        } else if (contrasenaRef.current.value === "") {

            guardarErrores("Debes ingresar la contraseña")

        } else if (apellidoRef.current.value === "") {

            guardarErrores("Debes ingresar el apellido")

        } else if (nombreRef.current.value === "") {

            guardarErrores("Debes ingresar el nombre")

        } else {

            await axios.post('/api/Auth/Registro/', datos)
                .then(res => {

                    if (res.data === 'Usuario Existente') {

                        toastr.warning("El usuario que quiere registrar, ya existe", "ATENCION")

                        guardarErrores("El usuario que quiere registrar, ya existe")

                    } else if (res.data.msg === 'Usuario Registrado') {

                        toastr.success("El usuario ingresado se registro con exito", "ATENCION")

                        // setTimeout(() => {
                        //     let accion = `Se registro un nuevo usuario id: '${res.data.body.insertId}' - ${datos.usuario}.`

                        //     let id = `US - ${res.data.body.insertId}`

                        //     registrarHistoria(accion, usuario, id)
                        // }, 200);




                    }

                })
                .catch(error => {
                    console.log(error)
                    toastr.error("Ocurrio un error al registrar el usuario")

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
            <FormRegistro
                usuarioRef={usuarioRef}
                contrasenaRef={contrasenaRef}
                nombreRef={nombreRef}
                apellidoRef={apellidoRef}
                registrarUsuario={registrarUsuario}
                errores={errores}
            />
        </Layout>
    )
}

export default Registrar