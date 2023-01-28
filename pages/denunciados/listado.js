import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
} from '@chakra-ui/react'
import Link from 'next/link'
import ListadoDenunciados from '../../components/Denunciado/ListadoDenunciados'

const Listado = () => {

    let apellidoRef = React.createRef()
    let nombreRef = React.createRef()
    let dniRef = React.createRef()
    let direccionRef = React.createRef()
    let telefonoRef = React.createRef()
    let nacimientoRef = React.createRef()
    let mailRef = React.createRef()


    const [usuario, guardarUsuario] = useState(null)
    const [denun, guardarDenun] = useState([])
    const [errores, guardarErrores] = useState(null)

    const traerDenun = async () => {

        await axios.get(`/api/denunciados/denunciado`, {
            params: {
                f: "denunciados"
            }
        })
            .then(res => {


                if (res.data.msg === "Denun Encontrados") {

                    guardarDenun(res.data.body)

                    toastr.success("Generando listado de denunciados", "ATENCION")

                } else if (res.data === "No Hay Denun") {

                    toastr.info("No hay denunciados registrados", "ATENCION")

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const editarDenun = async (row) => {

        guardarErrores(null)

        let datos = {
            nombre: nombreRef.current.value,
            apellido: apellidoRef.current.value,
            dni: dniRef.current.value,
            telefono: telefonoRef.current.value,
            direccion: direccionRef.current.value,
            nacimiento: nacimientoRef.current.value,
            mail: mailRef.current.value,
            f: "edicion",
            id: row.iddenunciado
        }

        if (apellidoRef.current.value === "") {

            guardarErrores("Debes ingresar el apellido")

        } else if (nombreRef.current.value === "") {

            guardarErrores("Debes ingresar el nombre")

        } else {

            if (datos.nacimiento === "") {
                datos.nacimiento = moment(row.nacimiento).format('YYYY-MM-DD')
            }


            await axios.put('/api/denunciados/denunciado/', datos)
                .then(res => {

                    console.log(res.data)

                    if (res.data.msg === 'Denun Editado') {

                        toastr.success("El denunciado fue editado con exito", "ATENCION")

                        let accion = `Se edito el denunciado id: ${row.iddenunciado} - ${row.apellido}, ${row.nombre}. DNI ${row.dni}.`

                        let id = `DN - ${row.iddenunciado}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {
                            traerDenun()
                        }, 500);

                    }

                })

                .catch(error => {
                    console.log(error)
                    toastr.error("Ocurrio un error al registrar el usuario")

                })
        }
    }

    const activarDenun = async (row) => {

        const datos = {
            f: 'activar',
            reactivacion: moment().format('YYYY-MM-DD HH:mm:ss'),
            estado: 1,
            id: row.iddenunciado
        }

        await axios.put('/api/denunciados/denunciado/', datos)
            .then(res => {

                if (res.data.msg === 'Denun Activado') {

                    toastr.success("El denunciado fue activado con exito", "ATENCION")

                    let accion = `Se activo el denunciado id: ${row.iddenunciado} - ${row.apellido}, ${row.nombre}. DNI ${row.dni}.`

                    let id = `CL - ${row.iddenunciado}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerClientes()
                    }, 500);

                }

            })

            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al registrar el usuario")

            })

    }

    const bajaDenun = async (row) => {

        const datos = {
            f: 'baja',
            estado: 0,
            fecha_baja: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: row.iddenunciado
        }

        await axios.put('/api/denunciados/denunciado/', datos)
            .then(res => {

                if (res.data.msg === 'Denun Baja') {

                    toastr.success("El denunciado fue dado de baja con exito", "ATENCION")

                    let accion = `Se dio de baja el denunciado id: ${row.iddenunciado} - ${row.apellido}, ${row.nombre}. DNI ${row.dni}.`


                    let id = `DN - ${row.iddenunciado}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerClientes()
                    }, 500);

                }

            })

            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al registrar el usuario")

            })

    }

    const existeDenun = async (dni) => {

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
                }

            })
            .catch(error => {
                console.log(error)
            })

    }

    let token = jsCookie.get("token")

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerDenun()
        }
    }, []);


    return (
        <Layout>

            {denun.length > 0 ? (

                <ListadoDenunciados
                    listado={denun}
                    nombreRef={nombreRef}
                    apellidoRef={apellidoRef}
                    dniRef={dniRef}
                    telefonoRef={telefonoRef}
                    direccionRef={direccionRef}
                    nacimientoRef={nacimientoRef}
                    mailRef={mailRef}
                    editarDenun={editarDenun}
                    activarDenun={activarDenun}
                    bajaDenun={bajaDenun}
                    existeDenun={existeDenun}
                    errores={errores}
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
                    border='1px'
                    borderColor='black'
                    borderRadius="xl"
                >
                    <AlertIcon boxSize='40px' mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize='lg'>
                        ATENCION!
                    </AlertTitle>
                    <AlertDescription maxWidth='sm'>
                        Actualmente no se encuentra ningun cliente registrado en la base de datos.
                        <Link href={'/clientes/nuevo'}>
                            <Button colorScheme={"blue"} >
                                Registrar Cliente
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            )}

        </Layout>
    )
}

export default Listado