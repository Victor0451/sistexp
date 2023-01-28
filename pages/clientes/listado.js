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
import ListadoClientes from '../../components/Clientes/ListadoClientes'

const Listado = () => {

    let apellidoRef = React.createRef()
    let nombreRef = React.createRef()
    let dniRef = React.createRef()
    let direccionRef = React.createRef()
    let telefonoRef = React.createRef()
    let nacimientoRef = React.createRef()
    let mailRef = React.createRef()


    const [usuario, guardarUsuario] = useState(null)
    const [clientes, guardarClientes] = useState([])
    const [errores, guardarErrores] = useState(null)

    const traerClientes = async () => {

        await axios.get(`/api/clientes/cliente`, {
            params: {
                f: "clientes"
            }
        })
            .then(res => {

                console.log(res)

                if (res.data.msg === "Clientes Encontrados") {

                    guardarClientes(res.data.body)

                    toastr.success("Generando listado de clientes", "ATENCION")

                } else if (res.data === "No Hay Clientes") {

                    toastr.info("No hay clientes registrados", "ATENCION")

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const editarCliente = async (row) => {

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
            id: row.idcliente
        }

        if (apellidoRef.current.value === "") {

            guardarErrores("Debes ingresar el apellido")

        } else if (nombreRef.current.value === "") {

            guardarErrores("Debes ingresar el nombre")

        } else {

            if (datos.nacimiento === "") {
                datos.nacimiento = moment(row.nacimiento).format('YYYY-MM-DD')
            }

            await axios.put('/api/clientes/cliente/', datos)
                .then(res => {

                    if (res.data.msg === 'Cliente Editado') {

                        toastr.success("El cliente fue editado con exito", "ATENCION")

                        let accion = `Se edito el cliente id: ${row.idcliente} - ${row.apellido}, ${row.nombre}. DNI ${row.dni}.`

                        let id = `CL - ${row.idcliente}`

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
    }

    const activarCliente = async (row) => {

        const datos = {
            f: 'activar',
            reactivacion: moment().format('YYYY-MM-DD HH:mm:ss'),
            estado: 1,
            id: row.idcliente
        }

        await axios.put('/api/clientes/cliente/', datos)
            .then(res => {

                if (res.data.msg === 'Cliente Activado') {

                    toastr.success("El cliente fue activado con exito", "ATENCION")

                    let accion = `Se activo el cliente id: ${row.idcliente} - ${row.apellido}, ${row.nombre}. DNI ${row.dni}.`

                    let id = `CL - ${row.idcliente}`

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

    const bajaCliente = async (row) => {

        const datos = {
            f: 'baja',
            estado: 0,
            fecha_baja: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: row.idcliente
        }

        await axios.put('/api/clientes/cliente/', datos)
            .then(res => {

                if (res.data.msg === 'Cliente Baja') {

                    toastr.success("El cliente fue dado de baja con exito", "ATENCION")

                    let accion = `Se dio de baja el cliente id: ${row.idcliente} - ${row.apellido}, ${row.nombre}. DNI ${row.dni}.`


                    let id = `CL - ${row.idcliente}`

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

    const existeCliente = async (dni) => {

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

            traerClientes()
        }
    }, []);


    return (
        <Layout>

            {clientes.length > 0 ? (

                <ListadoClientes
                    listado={clientes}
                    nombreRef={nombreRef}
                    apellidoRef={apellidoRef}
                    dniRef={dniRef}
                    telefonoRef={telefonoRef}
                    direccionRef={direccionRef}
                    nacimientoRef={nacimientoRef}
                    mailRef={mailRef}
                    editarCliente={editarCliente}
                    activarCliente={activarCliente}
                    bajaCliente={bajaCliente}
                    existeCliente={existeCliente}
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