import React, { useEffect, useState } from 'react'
import jsCookie from 'js-cookie';
import axios from 'axios';
import toastr from 'toastr';
import Layout from '../../components/Layouts/Layout';
import moment from 'moment';
import Router from 'next/router'
import ListadoUsuarios from '../../components/Auth/ListadoUsuarios';
import { registrarHistoria } from '../../utils/funciones'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'


const Listado = () => {

    let contrasenaRef = React.createRef()
    let nombreRef = React.createRef()
    let apellidoRef = React.createRef()
    let repContrasenaRef = React.createRef()

    const [usuario, guardarUsuario] = useState(null)
    const [listado, guardarListado] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [errores2, guardarErrores2] = useState(null)



    let token = jsCookie.get("token")

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerUsuario()

        }


    }, []);

    const traerUsuario = async () => {

        await axios.get(`/api/Auth/Registro`, {
            params: {
                f: "todos"
            }
        })

            .then(res => {

                if (res.data.msg === "Usuarios Encontrados") {

                    toastr.success("Generando listado", "ATENCION")

                    guardarListado(res.data.body)

                } else if (res.data.msg === "No hay Usuarios") {

                    toastr.warning("No hay categorias registradas", "ATENCION")

                }

            })
            .catch(error => {
                console.log(error)

                toastr.danger("Ocurrio un error al registrar el producto", "ATENCION")
            })

    }


    const editarUsuario = async (row) => {

        guardarErrores(null)

        let datos = {
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value,
            f: "edicion",
            id: row.idusuario

        }

        if (apellidoRef.current.value === "") {

            guardarErrores("Debes ingresar el apellido")

        } else if (nombreRef.current.value === "") {

            guardarErrores("Debes ingresar el nombre")

        } else {

            await axios.put('/api/Auth/Registro/', datos)
                .then(res => {

                    if (res.data.msg === 'Usuario Editado') {

                        toastr.success("El usuario fue editado con exito", "ATENCION")

                        let accion = `Se edito el usuario id: ${row.idusuario} - ${row.usuario}.`

                        let id = `US - ${row.idusuario}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            traerUsuario()
                        }, 500);

                    }

                })

                .catch(error => {
                    console.log(error)
                    toastr.error("Ocurrio un error al registrar el usuario")

                })
        }
    }

    const activarUsuario = async (row) => {

        const datos = {
            f: 'activar',
            reactivacion: moment().format('YYYY-MM-DD HH:mm:ss'),
            estado: 1,
            id: row.idusuario
        }

        await axios.put('/api/Auth/Registro/', datos)
            .then(res => {

                if (res.data.msg === 'Usuario Activado') {

                    toastr.success("El usuario fue activado con exito", "ATENCION")

                    let accion = `Se activo al usuario id: ${row.idusuario} - ${row.usuario}.`

                    let id = `US - ${row.idusuario}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerUsuario()
                    }, 500);

                }

            })

            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al registrar el usuario")

            })

    }

    const bajaUsuario = async (row) => {

        const datos = {
            f: 'baja',
            estado: 0,
            baja: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: row.idusuario
        }

        await axios.put('/api/Auth/Registro/', datos)
            .then(res => {

                if (res.data.msg === 'Usuario Baja') {

                    toastr.success("El usuario fue dado de baja con exito", "ATENCION")

                    let accion = `Se dio de baja al usuario id: ${row.idusuario} - ${row.usuario}.`

                    let id = `US - ${row.idusuario}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerUsuario()
                    }, 500);

                }

            })

            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al registrar el usuario")

            })

    }

    const contrasenaUsuario = async (row) => {

        guardarErrores2(null)
        let repcon = repContrasenaRef.current.value

        const datos = {
            f: 'contrasena',
            contrasena: contrasenaRef.current.value,
            id: row.idusuario
        }

        if (datos.contrasena === "") {
            guardarErrores2("Debes ingresar una nueva contraseña")
        } else if (repcon === "") {
            guardarErrores2("Debes repetir la contraseña")
        }
        else if (datos.contrasena !== repcon) {
            guardarErrores2("Las contraseñas deben ser las mismas")
        } else {

            await axios.put('/api/Auth/Registro/', datos)
                .then(res => {

                    if (res.data.msg === 'Usuario Contrasena') {

                        toastr.success("Se actualizo la contraseña con exito", "ATENCION")

                        let accion = `Se actualizo la contraseña al usuario id: ${row.idusuario} - ${row.usuario}.`

                        let id = `US - ${row.idusuario}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            traerUsuario()
                        }, 500);

                    }

                })

                .catch(error => {
                    console.log(error)
                    toastr.error("Ocurrio un error al registrar el usuario")

                })
        }
    }


    return (

        <Layout>


            {listado ? (
                <ListadoUsuarios
                    listado={listado}
                    errores={errores}
                    errores2={errores2}
                    contrasenaRef={contrasenaRef}
                    nombreRef={nombreRef}
                    apellidoRef={apellidoRef}
                    repContrasenaRef={repContrasenaRef}
                    editarUsuario={editarUsuario}
                    activarUsuario={activarUsuario}
                    bajaUsuario={bajaUsuario}
                    contrasenaUsuario={contrasenaUsuario}
                />

            ) : (

                <Alert
                    mt="10"
                    mb="10"
                    status='info'
                    variant='subtle'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    textAlign='center'
                    height='200px'
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        ATENCION!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Actualmente no se encuentra ningun usuario registrado en la base de datos.
                    </AlertDescription>
                </Alert>
            )}

        </Layout>

    )
}

export default Listado