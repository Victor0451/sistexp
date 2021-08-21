import React, { useContext, useState, useEffect } from "react";
import ListadoCliente from "../../components/cliente/ListadoCliente";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import ModalVerCliente from "../../components/cliente/ModalVerCliente";
import { confirmAlert } from "react-confirm-alert";

const Listado = () => {
  const [clientes, guardarClientes] = useState([]);
  const [clien, guardarClien] = useState({});

  const { session } = useContext(SupabaseContext);

  const verCliente = (row) => {
    guardarClien(null);

    guardarClien(row);
  };

  const deleteRow = async (id) => {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .delete()
        .match({ idcliente: id });
      if (error) throw error;
      toastr.success("El cliente se elimino con exito", "ATENCION");
      traerClientes();
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const eliminarCliente = (id) => {
    confirmAlert({
      title: "ATENCION",
      message: "¿Estas seguro que quiere eliminar al cliente?",
      buttons: [
        {
          label: "Si",
          onClick: () => {
            deleteRow(id);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const traerClientes = async () => {
    try {
      const { data, error } = await supabase.from("clientes").select();
      guardarClientes(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  useEffect(() => {
    traerClientes();
  }, []);

  return (
    <Layout>
      {!session ? (
        <ErrorPage />
      ) : (
        <>
          <ListadoCliente
            clientes={clientes}
            verCliente={verCliente}
            eliminarCliente={eliminarCliente}
          />

          <ModalVerCliente clien={clien} />
        </>
      )}
    </Layout>
  );
};

export default Listado;
