import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import FormNuevoExpediente from '../../components/Expedientes/FormNuevoExpediente'

const Nuevo = () => {

    let fechaInicioRef = React.createRef()
    let clienteRef = React.createRef()
    let descripcionRef = React.createRef()
    let denunciadoRef = React.createRef()
    let nexpfisicoRef = React.createRef()
    let caratulaRef = React.createRef()

    const [usuario, guardarUsuario] = useState(null)
    const [nexpediente, guardarNExpediente] = useState(null)
    const [errores, guardarErrores] = useState(null)
    const [clientes, guardarClientes] = useState([])
    const [denun, guardarDenun] = useState([])


    const nExpe = async () => {

        await axios.get(`/api/expedientes/expediente`, {
            params: {
                f: 'nexp'
            }
        })
            .then(res => {

                if (res.data.msg === 'NEXP Encontrado') {

                    let nexp = `${res.data.body.idexpediente + 1}--${moment().format('YYYY')}`

                    guardarNExpediente(nexp)

                } else if (res.data.msg === 'No hay Expedientes') {

                    let nexp = `${res.data.body}--${moment().format('YYYY')}`

                    guardarNExpediente(nexp)

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

    const traerDenun = async () => {

        await axios.get(`/api/denunciados/denunciado`, {
            params: {
                f: 'listdenun'
            }
        })
            .then(res => {

                if (res.data.msg === 'Listado Generado') {

                    guardarDenun(res.data.body)

                } else if (res.data.msg === 'No hay Denun') {

                    toastr.info("No hay denunciados registrados", "ATENCION")
                }

            })

            .catch(error => {
                console.log(error)
            })

    }

    const nuevoExpediente = async () => {

        let exp = {

            fecha_inicio: fechaInicioRef.current.value,
            fecha_carga: moment().format('YYYY-MM-DD HH:mm:ss'),
            nexpediente: nexpediente,
            nexpfisico: nexpfisicoRef.current.value,
            caratula: caratulaRef.current.ref,
            ano: moment().format('YYYY'),
            idcliente: clienteRef.current.value,
            operador: usuario,
            descripcion: descripcionRef.current.value,
            iddenunciado: denunciadoRef.current.value,
            estado: 1,
            f: "registrar expediente"

        }

        if (exp.cliente === "") {

            guardarErrores("Debes elegir un cliente")

        } else if (exp.denunciado === "") {

            guardarErrores("Debes elegir un denunciado")

        } else {

            await axios.post(`/api/expedientes/expediente`, exp)
                .then(res => {

                    if (res.data.msg === "Expediente Registrado") {

                        toastr.success("Expediente registrado con exito", "ATENCION")

                        let accion = `Se registro el expediente id:  ${res.data.body.insertId} N° ${exp.nexpediente}. Caratula ${exp.caratula}.`

                        let id = `EX -  ${res.data.body.insertId}`

                        registrarHistoria(accion, usuario, id)

                        setTimeout(() => {

                            Router.push('/expedientes/listado')

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

            nExpe()

            traerClientes()
            traerDenun()
        }
    }, []);

    return (
        <Layout>
            <FormNuevoExpediente
                errores={errores}
                fechaInicioRef={fechaInicioRef}
                nexpediente={nexpediente}
                clienteRef={clienteRef}
                descripcionRef={descripcionRef}
                denunciadoRef={denunciadoRef}
                caratulaRef={caratulaRef}
                nexpfisicoRef={nexpfisicoRef}
                clientes={clientes}
                denun={denun}
                nuevoExpediente={nuevoExpediente}
            />
        </Layout>
    )
}

export default Nuevo