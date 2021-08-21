import React, { useContext, useState, useEffect } from "react";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import { confirmAlert } from "react-confirm-alert";
import FormNuevaAudiencia from "../../components/audiencia/FormNuevaAudiencia";
import validaRegistroAudiencia from "../../validacion/validarRegistrarAudiencia";
import useValidacion from "../../hooks/useValidacion";

const STATE_INICIAL = {
  descripcion: "",
  inicio: "",
  fin: "",
  expediente: "",
  prioridad: "",
};

const Nueva = () => {
  let siRef = React.createRef();
  let noRef = React.createRef();

  const [expedientes, guardarExpedientes] = useState([]);

  const { session } = useContext(SupabaseContext);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(STATE_INICIAL, validaRegistroAudiencia, registrarAudiencia);

  const { descripcion, inicio, fin, expediente, prioridad, allDay } = valores;

  async function registrarAudiencia() {
    const audiencia = {
      title: descripcion,
      start: inicio,
      end: fin,
      expediente: expediente,
      priority: prioridad,
      allDay: "",
      operador:session.email
    };
    if (siRef.current.checked === true && noRef.current.checked === false) {
      audiencia.allDay = 1;
    } else if (
      siRef.current.checked === false &&
      noRef.current.checked === true
    ) {
      audiencia.allDay = 0;
    }

    try {
      const { error } = await supabase.from("audiencias").insert([audiencia]);
      if (error) throw error;
      toastr.success("La audiencia se registro con exito", "ATENCION");
      setTimeout(() => {
        //  Router.push("/audiecia/calendario");
        mandarMail(audiencia);
      }, 500);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  }

  const mandarMail = (audiencia) => {
    fetch("/api/mail", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(audiencia),
    })
      .then((res) => {
        if (res.status === 200) {
          toastr.info(
            "Se envio un email con la notificacion de la audiencia",
            "ATENCION"
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const traerExpedientes = async () => {
    try {
      const { data, error } = await supabase.from("expedientes").select();
      if (error) throw error;
      guardarExpedientes(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  useEffect(() => {
    traerExpedientes();
  }, []);

  return (
    <Layout>
      {!session ? (
        <ErrorPage />
      ) : (
        <FormNuevaAudiencia
          descripcion={descripcion}
          inicio={inicio}
          fin={fin}
          expediente={expediente}
          prioridad={prioridad}
          siRef={siRef}
          noRef={noRef}
          errores={errores}
          expedientes={expedientes}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </Layout>
  );
};

export default Nueva;
