import React, { useEffect, useState } from 'react'
import Layout from '../components/Layouts/Layout'
import axios from 'axios'
import FormInicioSesion from '../components/Auth/FormInicioSesion'
import toastr from 'toastr'
import jsCookie from 'js-cookie'
import Router from 'next/router'


export default function Home() {


  let usuarioRef = React.createRef()
  let contrasenaRef = React.createRef()

  const [errores, guardarErrores] = useState(null)


  const iniciarSesion = async () => {

    if (usuarioRef.current.value === "") {

      guardarErrores("Debes ingresar el usuario")

    } else if (contrasenaRef.current.value === "") {

      guardarErrores("Debes ingresar la contraseña")

    } else {

      await axios.get('/api/Auth/Registro/', {
        params: {
          usuario: usuarioRef.current.value,
          contrasena: contrasenaRef.current.value
        }
      })
        .then(res => {


          if (res.data.msg === 'Usuario Valido') {

            toastr.success("Sesion Iniciada", "ATENCION")
            jsCookie.set("usuario", res.data.body.usuario)
            jsCookie.set("token", res.data.token)

            Router.push('/home/home')


          } else if (res.data === 'Contraseña Invalida') {

            toastr.warning("La contraseña ingresada es invalida", "ATENCION")

            guardarErrores("La contraseña ingresada es invalida")


          } else if (res.data === 'Usuario Inexistente') {

            toastr.warning("El usuario ingresado no existe", "ATENCION")

            guardarErrores("El usuario ingresado no existe")


          }
        })
        .catch(error => {
          console.log(error)
          toastr.error("Ocurrio un error al registrar el usuario")
        })

    }
  }

  return (
    <Layout >
      <FormInicioSesion
        iniciarSesion={iniciarSesion}
        usuarioRef={usuarioRef}
        contrasenaRef={contrasenaRef}
        errores={errores}
      />
    </Layout>
  )
}
