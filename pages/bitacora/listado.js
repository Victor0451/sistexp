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
import ListadoBitacoras from '../../components/Bitacora/ListadoBitacoras'

const Listado = () => {

    let fechaRef = React.createRef()
    let tituloRef = React.createRef()
    let descripcionRef = React.createRef()


    const [usuario, guardarUsuario] = useState(null)
    const [bitacoras, guardarBitacoras] = useState([])
    const [errores, guardarErrores] = useState(null)



    const traerBitacoras = async () => {

        await axios.get(`/api/bitacora/bitacora`)
            .then(res => {

                if (res.data.msg === "Bitacoras Encontradas") {

                    guardarBitacoras(res.data.body)

                    toastr.success("Generando listado de bitacoras", "ATENCION")

                } else if (res.data === "No Hay Bitacoras") {

                    toastr.info("No hay bitacoras registrados", "ATENCION")

                }
            })
            .catch(error => {
                console.log(error)
            })

    }

    const editBitacora = async (row) => {

        let bit = {

            idbitacora: row.idbitacora,
            fecha: moment(fechaRef.current.value).format('YYYY-MM-DD'),
            titulo: tituloRef.current.value,
            descripcion: descripcionRef.current.value

        }


        if (bit.fecha === "") {

            guardarErrores("Debes ingresar una fecha")

        } else if (bit.titulo === "") {

            guardarErrores("Debes ingresar un titulo")

        } else if (bit.descripcion === "") {

            guardarErrores("Debes ingresar una descripcion")

        } else {

            await axios.put(`/api/bitacora/bitacora`, bit)
                .then(res => {

                    if (res.data.msg === 'Bitacora Editada') {

                        toastr.success("Bitacora editada", "ATENCION")


                        setTimeout(() => {

                            let accion = `Se edito la bitacora id:  ${row.idbitacora}.`

                            let id = `BT -  ${res.data.body.row.idbitacora}`

                            registrarHistoria(accion, usuario, id)

                            traerBitacoras()

                        }, 500);


                    }

                })
                .catch(error => {
                    console.log(error)
                })

        }
    }

    const contCaracteres = () => {

        const mensaje = document.getElementById('mensaje');
        const contador = document.getElementById('contador');

        mensaje.addEventListener('input', function (e) {
            const target = e.target;
            const longitudMax = target.getAttribute('maxlength');
            const longitudAct = target.value.length;
            contador.innerHTML = `${longitudAct}/${longitudMax}`;
        });

    }

    const bajaBitacora = async (row) => {

        await axios.delete('/api/bitacora/bitacora/', {
            params: {
                id: row.idbitacora
            }
        })

            .then(res => {

                if (res.data.msg === 'Bitacora Eliminada') {

                    toastr.success("La bitacora se elimino con exito", "ATENCION")

                    setTimeout(() => {

                        let accion = `Se elimino bitacora ID: ${row.idbitacora}, titulo: ${row.titulo}.`

                        let id = `BT - ${row.idbitacora}`

                        registrarHistoria(accion, usuario, id)

                        traerBitacoras()
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

            traerBitacoras()


        }
    }, []);

    return (
        <Layout>


            {bitacoras.length > 0 ? (

                <ListadoBitacoras
                    listado={bitacoras}
                    fechaRef={fechaRef}
                    tituloRef={tituloRef}
                    descripcionRef={descripcionRef}
                    errores={errores}
                    editBitacora={editBitacora}
                    contCaracteres={contCaracteres}
                    bajaBitacora={bajaBitacora}
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
                        Actualmente no se encuentra ninguna bitacora registrada en la base de datos.
                        <Link href={'/bitacora/nuevo'}>
                            <Button colorScheme={"blue"} >
                                Registrar Bitacora
                            </Button>
                        </Link>
                    </AlertDescription>
                </Alert>
            )}

        </Layout>
    )
}

export default Listado