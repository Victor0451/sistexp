import React, { useContext, useState, useEffect } from "react";
import ListadoPersonal from "../../components/personal/ListadoPersonal";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import ModalVerPersonal from "../../components/personal/ModalVerPersonal";
import { confirmAlert } from "react-confirm-alert";

const Listado = () => {
  const [personal, guardarPersonal] = useState([]);
  const [per, guardarPer] = useState({});

  const { session } = useContext(SupabaseContext);

  const verPersonal = (row) => {
    guardarPer(null);

    guardarPer(row);
  };

  const deleteRow = async (id) => {
    try {
      const { data, error } = await supabase
        .from("personal")
        .delete()
        .match({ idpersonal: id });
      if (error) throw error;
      toastr.success("El personal se elimino con exito", "ATENCION");
      traerPersonal();
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const eliminarPersonal = (id) => {
    confirmAlert({
      title: "ATENCION",
      message: "¿Estas seguro que quiere eliminar al personal?",
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

  const traerPersonal = async () => {
    try {
      const { data, error } = await supabase.from("personal").select();
      guardarPersonal(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  useEffect(() => {
    traerPersonal();
  }, []);

  return (
    <Layout>
      {!session ? (
        <ErrorPage />
      ) : (
        <>
          <ListadoPersonal
            personal={personal}
            verPersonal={verPersonal}
            eliminarPersonal={eliminarPersonal}
          />

          <ModalVerPersonal per={per} />
        </>
      )}
    </Layout>
  );
};

export default Listado;
