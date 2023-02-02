import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toastr from 'toastr'
import { registrarHistoria } from '../../utils/funciones'
import moment from 'moment'
import jsCookie from 'js-cookie'
import Router from 'next/router'
import FormNuevaBitacora from '../../components/Bitacora/FormNuevaBitacora'

const Nuevo = () => {

    let fechaRef = React.createRef()
    let tituloRef = React.createRef()
    let descripcionRef = React.createRef()

    const [usuario, guardarUsuario] = useState(null)
    const [errores, guardarErrores] = useState(null)



    const regBitacora = async () => {

        let bit = {

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


            await axios.post(`/api/bitacora/bitacora`, bit)
                .then(res => {

                    if (res.data.msg === 'Bitacora Registrada') {

                        toastr.success("Bitacora registrada", "ATENCION")

                        setTimeout(() => {

                            let accion = `Se registro la Bitacora id:  ${res.data.body.insertId}, titulo: ${bit.titulo}.`

                            let id = `BT -  ${res.data.body.insertId}`

                            registrarHistoria(accion, usuario, id)

                            Router.push(`/bitacoras/listado`)

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
            <FormNuevaBitacora
                fechaRef={fechaRef}
                tituloRef={tituloRef}
                descripcionRef={descripcionRef}
                errores={errores}
                contCaracteres={contCaracteres}
                regBitacora={regBitacora}
            />
        </Layout>
    )
}

export default Nuevo