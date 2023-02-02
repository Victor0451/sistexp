import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import ListadoExpediente from '../../components/Expedientes/ListadoExpediente'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Button,
} from '@chakra-ui/react'
import Link from 'next/link'

const listado = () => {

    const [usuario, guardarUsuario] = useState(null)
    const [listado, guardarListado] = useState([])
    const [cliente, guardarCliente] = useState(null)
    const [denun, guardarDenun] = useState(null)
    const [clientes, guardarClientes] = useState([])
    const [denuns, guardarDenuns] = useState([])
    const [errores, guardarErrores] = useState(null)
    const [movimientos, guardarMovimientos] = useState([])

    // EXPEDIENTES

    let fechaInicioRef = React.createRef()
    let clienteRef = React.createRef()
    let descripcionRef = React.createRef()
    let denunciadoRef = React.createRef()
    let nexpfisicoRef = React.createRef()
    let caratulaRef = React.createRef()


    // MOVIMIENTOS

    let fechaMovRef = React.createRef()
    let provieneRef = React.createRef()
    let derivaRef = React.createRef()
    let descripcionMovRef = React.createRef()


    const traerExpedientes = async () => {

        await axios.get('/api/expedientes/expediente', {
            params: {
                f: 'listexp'
            }
        }).then(res => {

            if (res.data.msg === "Expedientes Encontrados") {

                guardarListado(res.data.body)

            } else if (res.data.msg === "No hay Expedientes") {

                toastr.info("No hay expedientes registrados", "ATENCION")

            }

        })
            .catch(error => {
                console.log(error)
            })

    }

    const traerCliente = async (id) => {

        await axios.get(`/api/clientes/cliente`, {
            params: {
                f: 'busclien',
                id: id
            }
        })
            .then(res => {

                if (res.data.msg === "Cliente Encontrado") {

                    guardarCliente(res.data.body)

                } else if (res.data.msg === "No Hay Cliente") {

                    toastr.info("No se encontro al cliente", "ATENCION")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const traerDenun = async (id) => {

        await axios.get(`/api/denunciados/denunciado`, {
            params: {
                f: 'busdenun',
                id: id
            }
        })
            .then(res => {

                if (res.data.msg === "Denun Encontrado") {

                    guardarDenun(res.data.body)

                } else if (res.data.msg === "No Hay Denun") {

                    toastr.info("No se encontro al denunciado", "ATENCION")
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const traerClientes = async () => {

        await axios.get(`/api/clientes/cliente`, {
            params: {
                f: 'listclien'
            }
        })
            .then(res => {

                if (res.data.msg === 'Listado Generado') {

                    guardarClientes(res.data.body)

                } else if (res.data.msg === 'No hay Clientes') {

                    toastr.info("No hay clientes registrados", "ATENCION")
                }

            })

            .catch(error => {
                console.log(error)
            })

    }

    const traerDenuns = async () => {

        await axios.get(`/api/denunciados/denunciado`, {
            params: {
                f: 'listdenun'
            }
        })
            .then(res => {

                if (res.data.msg === 'Listado Generado') {

                    guardarDenuns(res.data.body)

                } else if (res.data.msg === 'No hay Denun') {

                    toastr.info("No hay denunciados registrados", "ATENCION")
                }

            })

            .catch(error => {
                console.log(error)
            })

    }

    const editarExpediente = async (row) => {

        let exp = {

            fecha_inicio: fechaInicioRef.current.value,
            nexpfisico: nexpfisicoRef.current.value,
            caratula: caratulaRef.current.value,
            idcliente: clienteRef.current.value,
            descripcion: descripcionRef.current.value,
            iddenunciado: denunciadoRef.current.value,
            f: 'edicion',
            id: row.idexpediente

        }

        if (exp.idcliente === '') {

            guardarErrores("Debes elegir un cliente")

        } else if (exp.denunciado === "") {

            guardarErrores("Debes elegir un denunciado")

        } else {

            if (exp.fecha_inicio === "") {

                exp.fecha_inicio = moment(row.fecha_inicio).format('YYYY-MM-DD HH:mm:ss')

            }

            await axios.put(`/api/expedientes/expediente`, exp)
                .then(res => {

                    if (res.data.msg === "Expediente Editado") {

                        toastr.success("Expediente editado con exito", "ATENCION")

                        let accion = `Se edito el expediente ID: ${row.idexpediente}, caratula ${row.caratula}, N° fisico: ${row.nexpfisico}, N° Sistema: ${row.nexpediente}.`

                        let id = `EX -  ${row.idexpediente}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {

                            traerExpedientes()

                        }, 500);

                    }

                })
                .catch(error => {
                    console.log(error)
                })


        }



    }

    const bajaExpediente = async (row) => {

        const datos = {
            f: 'baja',
            estado: 0,
            fecha_baja: moment().format('YYYY-MM-DD HH:mm:ss'),
            id: row.idexpediente
        }

        await axios.put('/api/expedientes/expediente/', datos)
            .then(res => {
                console.log(res.data)
                if (res.data.msg === 'Expediente Baja') {

                    toastr.success("El expediente fue dado de baja con exito", "ATENCION")

                    let accion = `Se dio de baja el expediente ID: ${row.idexpediente}, caratula ${row.caratula}, N° fisico: ${row.nexpfisico}, N° Sistema: ${row.nexpediente}.`

                    let id = `EX - ${row.idexpediente}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerExpedientes()
                    }, 500);

                }

            })

            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al registrar el usuario")

            })

    }

    const traerMovimientos = async (exp) => {

        guardarMovimientos([])

        await axios.get('/api/expedientes/expediente', {
            params: {
                f: 'traer movimientos',
                id: exp
            }
        }).then(res => {

            if (res.data.msg === "Movimientos Encontrados") {

                guardarMovimientos(res.data.body)

            } else if (res.data.msg === "No hay Movimientos") {

                toastr.info("No hay movimientos registrados", "ATENCION")

            }

        })
            .catch(error => {
                console.log(error)
            })

    }

    const regMovimiento = async (row) => {

        let mov = {

            idexpediente: row.idexpediente,
            nexpediente: row.nexpediente,
            fecha_movimiento: moment(fechaMovRef.current.value).format('YYYY-MM-DD'),
            proviene: provieneRef.current.value,
            deriva: derivaRef.current.value,
            descripcion: descripcionMovRef.current.value,
            estado: 1,
            operador: usuario,
            f: 'nuevo movimiento'
        }


        await axios.post(`/api/expedientes/expediente`, mov)
            .then(res => {

                if (res.data.msg === 'Movimiento Registrado')

                    toastr.success("Se registro el movimiento")

                setTimeout(() => {

                    let accion = `Se registro moviemiento N°: ${res.data.body.insertId} en el expediente ID: ${row.idexpediente}, N° fisico: ${row.nexpfisico}, N° Sistema: ${row.nexpediente}.`

                    let id = `MV -  ${row.idexpediente}`

                    registrarHistoria(accion, usuario, id)

                    traerMovimientos(row.idexpediente)

                }, 500);


            })
            .catch(error => {
                console.log(error)
            })

    }

    const bajaMovim = async (row) => {


        await axios.delete('/api/expedientes/expediente/', {
            params: {
                id: row.idmovimientos,
            }
        })
            .then(res => {

                if (res.data.msg === 'Movimiento Eliminado') {

                    toastr.success("El movimiento fue dado de baja con exito", "ATENCION")

                    let accion = `Se dio de baja el movimiento ID: ${row.idmovimientos} del expediente N° Sistema: ${row.nexpediente}.`

                    let id = `MV - ${row.idmovimientos}`

                    registrarHistoria(accion, usuario, id)

                    setTimeout(() => {
                        traerMovimientos(row.idexpediente)
                    }, 500);

                }

            })

            .catch(error => {
                console.log(error)
                toastr.error("Ocurrio un error al registrar el usuario")

            })

    }


    let token = jsCookie.get("token")

    useEffect(() => {
        if (!token) {
            Router.push("/redirect");
        } else {
            let usuario = jsCookie.get("usuario")
            guardarUsuario(usuario)

            traerExpedientes()
            traerClientes()
            traerDenuns()

        }
    }, []);

    return (
        <Layout>

            {listado.length > 0 ? (
                <ListadoExpediente
                    listado={listado}
                    traerCliente={traerCliente}
                    traerDenun={traerDenun}
                    cliente={cliente}
                    denun={denun}
                    fechaInicioRef={fechaInicioRef}
                    clienteRef={clienteRef}
                    descripcionRef={descripcionRef}
                    denunciadoRef={denunciadoRef}
                    nexpfisicoRef={nexpfisicoRef}
                    caratulaRef={caratulaRef}
                    clientes={clientes}
                    denuns={denuns}
                    movimientos={movimientos}
                    editarExpediente={editarExpediente}
                    errores={errores}
                    bajaExpediente={bajaExpediente}
                    traerMovimientos={traerMovimientos}
                    fechaMovRef={fechaMovRef}
                    provieneRef={provieneRef}
                    derivaRef={derivaRef}
                    descripcionMovRef={descripcionMovRef}
                    regMovimiento={regMovimiento}
                    bajaMovim={bajaMovim}
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
                        Actualmente no se encuentra ningun expediente registrado en la base de datos.
                        <Link href={'/expedientes/nuevo'}>
                            <Button colorScheme={"blue"} >
                                Registrar Expediente
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            )}

        </Layout>
    )
}

export default listado