import React, { useContext } from "react";
import FormNuevoCliente from "../../components/cliente/FormNuevoCliente";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import validaRegistroCliente from "../../validacion/validarRegistrarCliente";
import useValidacion from "../../hooks/useValidacion";
import toastr from "toastr";
import Router from "next/router";

const STATE_INICIAL = {
  apellido: "",
  nombre: "",
  dni: "",
  cuit: "",
  domicilio: "",
  telefono: "",
  nacimiento: "",
  mail: "",
};

const Nuevo = () => {
  const { session } = useContext(SupabaseContext);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validaRegistroCliente, registrarCliente);

  const { apellido, nombre, dni, cuit, domicilio, telefono, nacimiento, mail } =
    valores;

  async function registrarCliente() {
    const cliente = {
      apellido,
      nombre,
      dni,
      cuit,
      domicilio,
      telefono,
      nacimiento,
      mail,
    };

    try {
      const { data } = await supabase.from("clientes").select().eq("dni", dni);
      if (data.length === 0) {
        try {
          const { error } = await supabase.from("clientes").insert([cliente]);
          if (error) throw error;
          toastr.success("El cliente se registro con exito", "ATENCION");
          setTimeout(() => {
            Router.push("/cliente/listado");
          }, 300);
        } catch (error) {
          toastr.error(
            `${error.error_description || error.message}`,
            "ATENCION"
          );
        }
      } else {
        toastr.warning("El cliente ya se encuentra registrado", "ATENCION");
      }
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  }

  return (
    <Layout>
      {!session ? (
        <ErrorPage />
      ) : (
        <FormNuevoCliente
          errores={errores}
          apellido={apellido}
          nombre={nombre}
          dni={dni}
          cuit={cuit}
          domicilio={domicilio}
          telefono={telefono}
          nacimiento={nacimiento}
          mail={mail}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </Layout>
  );
};

export default Nuevo;
