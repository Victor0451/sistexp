import React, { useContext, useState, useEffect } from "react";
import ListadoDenunciado from "../../components/denunciado/ListadoDenunciado";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import ModalVerDenunciado from "../../components/denunciado/ModalVerDenunciado";
import { confirmAlert } from "react-confirm-alert";

const Listado = () => {
  const [denunciados, guardarDenunciados] = useState([]);
  const [denun, guardarDenun] = useState({});

  const { session } = useContext(SupabaseContext);

  const verDenunciados = (row) => {
    guardarDenun(null);

    guardarDenun(row);
  };

  const deleteRow = async (id) => {
    try {
      const { data, error } = await supabase
        .from("denunciados")
        .delete()
        .match({ iddenunciado: id });
      if (error) throw error;
      toastr.success("El denunciado se elimino con exito", "ATENCION");
      traerClientes();
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const eliminarDenunciados = (id) => {
    confirmAlert({
      title: "ATENCION",
      message: "¿Estas seguro que quiere eliminar al denunciado?",
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

  const traerDenunciados = async () => {
    try {
      const { data, error } = await supabase.from("denunciados").select();
      guardarDenunciados(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };


  useEffect(() => {
    traerDenunciados();
  }, []);

  return (
    <Layout>
      {!session ? (
        <ErrorPage />
      ) : (
        <>
          <ListadoDenunciado
            denunciados={denunciados}
            verDenunciados={verDenunciados}
            eliminarDenunciados={eliminarDenunciados}
          />

          <ModalVerDenunciado denun={denun} />
        </>
      )}
    </Layout>
  );
};

export default Listado;
