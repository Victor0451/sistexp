import React, { useContext, useState, useEffect } from "react";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import moment from "moment";
import validarRegistrarExpediente from "../../validacion/validarRegistrarExpediente";
import useValidacion from "../../hooks/useValidacion";
import FormNuevoExpediente from "../../components/expediente/FormNuevoExpediente";

const STATE_INICIAL = {
  fechaInicio: "",
  nexpediente: "",
  ano: "",
  cliente: "",
  personal: "",
  descripcion: "",
  denunciado: "",
  estado: "",
};

const Nuevo = () => {
  const [clientes, guardarClientes] = useState(null);
  const [denunciados, guardarDenunciados] = useState(null);

  const { session } = useContext(SupabaseContext);

  const { valores, errores, handleChange, handleSubmit, handleBlur } =
    useValidacion(
      STATE_INICIAL,
      validarRegistrarExpediente,
      registrarExpediente
    );

  const {
    fechaInicio,
    nexpediente,
    ano,
    cliente,
    descripcion,
    denunciado,
    estado,
  } = valores;

  async function registrarExpediente() {
    const expediente = {
      fechaCreacion: moment().format("YYYY-MM-DD"),
      fechaInicio,
      nexpediente,
      ano,
      cliente,
      descripcion,
      denunciado,
      estado,
      personal: session.email,
    };

    try {
      const { error } = await supabase.from("expedientes").insert([expediente]);
      if (error) throw error;
      toastr.success("El expediente se registro con exito", "ATENCION");
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  }

  const traerCliente = async () => {
    try {
      const { data, error } = await supabase.from("clientes").select();
      guardarClientes(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const traerDenunciados = async () => {
    try {
      const { data, error } = await supabase.from("denunciados").select();
      guardarDenunciados(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  useEffect(() => {
    traerCliente();
    traerDenunciados();
  }, []);

  return (
    <Layout>
      {!session ? (
        <ErrorPage />
      ) : (
        <FormNuevoExpediente
          errores={errores}
          fechaInicio={fechaInicio}
          cliente={cliente}
          nexpediente={nexpediente}
          ano={ano}
          descripcion={descripcion}
          denunciado={denunciado}
          estado={estado}
          handleBlur={handleBlur}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          clientes={clientes}
          denunciados={denunciados}
        />
      )}
    </Layout>
  );
};

export default Nuevo;
