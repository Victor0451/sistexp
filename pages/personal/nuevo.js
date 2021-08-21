import React, { useContext } from "react";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import validaRegistroPersonal from "../../validacion/validarRegistrarPersonal";
import useValidacion from "../../hooks/useValidacion";
import FormNuevoPersonal from "../../components/personal/FormNuevoPersonal";
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
  rol: "",
  estado: "",
};

const Nuevo = () => {
  const { session } = useContext(SupabaseContext);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validaRegistroPersonal, registrarPersonal);

  const {
    apellido,
    nombre,
    dni,
    cuit,
    domicilio,
    telefono,
    nacimiento,
    mail,
    rol,
    estado,
  } = valores;

  async function registrarPersonal() {
    const personal = {
      apellido,
      nombre,
      dni,
      cuit,
      domicilio,
      telefono,
      nacimiento,
      mail,
      rol,
      estado,
    };

    try {
      const { data } = await supabase.from("personal").select().eq("dni", dni);
      if (data.length === 0) {
        try {
          const { error } = await supabase.from("personal").insert([personal]);
          if (error) throw error;
          toastr.success("El personal se registro con exito", "ATENCION");
          setTimeout(() => {
            Router.push("/personal/listado");
          }, 300);
        } catch (error) {
          toastr.error(
            `${error.error_description || error.message}`,
            "ATENCION"
          );
        }
      } else {
        toastr.warning("El personal ya se encuentra registrado", "ATENCION");
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
        <FormNuevoPersonal
          errores={errores}
          apellido={apellido}
          nombre={nombre}
          dni={dni}
          cuit={cuit}
          domicilio={domicilio}
          telefono={telefono}
          nacimiento={nacimiento}
          mail={mail}
          rol={rol}
          estado={estado}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </Layout>
  );
};

export default Nuevo;
