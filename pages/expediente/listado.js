import React, { useContext, useState, useEffect } from "react";
import ErrorPage from "../../components/layouts/ErrorPage";
import Layout from "../../components/layouts/Layout";
import { supabase, SupabaseContext } from "../../config/supabaseClient";
import toastr from "toastr";
import moment from "moment";
import ListadoExpediente from "../../components/expediente/ListadoExpediente";
import ModalVerExpediente from "../../components/expediente/ModalVerExpediente";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import fileDownload from "js-file-download";

const Listado = () => {
  let descripcionRef = React.createRef();

  const [expedientes, guardarExpedientes] = useState([]);
  const [exp, guardarExp] = useState([]);
  const [cliente, guardarCliente] = useState([]);
  const [denunciado, guardarDenunciado] = useState([]);
  const [archi, guardarArchivos] = useState([]);
  const [listadoArchivos, guardarListArchivos] = useState([]);
  const [error, guardarError] = useState(null);

  const { session } = useContext(SupabaseContext);

  const traerExpedientes = async () => {
    try {
      const { data, error } = await supabase.from("expedientes").select();
      guardarExpedientes(data);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const verExpediente = (row) => {
    guardarExp(null);

    guardarExp(row);

    traerCliente(row.cliente);

    traerDenunciado(row.denunciado);
  };

  const datosExpediente = (row) => {
    guardarExp(null);

    guardarExp(row);

    traerArchivos(row.idexpediente);
  };

  const deleteRow = async (id) => {
    try {
      const { data, error } = await supabase
        .from("expedientes")
        .delete()
        .match({ idexpediente: id });
      if (error) throw error;
      toastr.success("El expediente se elimino con exito", "ATENCION");
      traerExpedientes();
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const eliminarExpediente = (id) => {
    confirmAlert({
      title: "ATENCION",
      message: "¿Estas seguro que quiere eliminar el expediente?",
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

  const traerCliente = async (id) => {
    try {
      const { data, error } = await supabase
        .from("clientes")
        .select()
        .eq("idcliente", id);
      if (error) throw error;
      guardarCliente(data[0]);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const traerDenunciado = async (id) => {
    try {
      const { data, error } = await supabase
        .from("denunciados")
        .select()
        .eq("iddenunciado", id);

      if (error) throw error;
      guardarDenunciado(data[0]);
    } catch (error) {
      toastr.error(`${error.error_description || error.message}`, "ATENCION");
    }
  };

  const handlerArchivos = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${file.name.split(".")[0]}.${fileExt}`;
    const filePath = `${fileName}`;

    const archi = {
      file: file,
      fileExt: fileExt,
      fileName: fileName,
      filePath: filePath,
    };

    guardarArchivos(archi);
  };

  const subirArchivo = async () => {
    const archivo = {
      idexpediente: exp.idexpediente,
      nexpediente: exp.nexpediente,
      ano: exp.ano,
      url: archi.fileName,
      descripcion: descripcionRef.current.value,
    };

    if (archivo.descripcion === "") {
      guardarError(
        "Debes escribir de que se trata el archivo que estas subiendo"
      );
    } else {
      guardarError(null);
      try {
        let { data, error: uploadError } = await supabase.storage
          .from("expedientes")
          .upload(archi.filePath, archi.file);

        if (uploadError) {
          throw uploadError;
        }

        try {
          const { data, error } = await supabase
            .from("archivos_exp")
            .insert([archivo]);
          if (error) throw error;
          guardarCliente(data[0]);

          toastr.success("El archivo se subio con exito", "ATENCION");

          traerArchivos(exp.idexpediente);
        } catch (error) {
          toastr.error(
            `${error.error_description || error.message}`,
            "ATENCION"
          );
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };

  const bajarArchivo = async (url) => {
    try {
      const { data, error } = await supabase.storage
        .from("expedientes")
        .getPublicUrl(url);

      if (error) {
        throw error;
      }

      await axios
        .get(data.publicURL, {
          responseType: "blob",
        })
        .then((res) => {
          fileDownload(res.data, url);
        });
    } catch (error) {
      alert(error.message);
    }
  };

  const traerArchivos = async (id) => {
    try {
      const { data, error } = await supabase
        .from("archivos_exp")
        .select()
        .eq("idexpediente", id);
      if (error) throw error;
      guardarListArchivos(data);
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
        <>
          <ListadoExpediente
            expedientes={expedientes}
            verExpediente={verExpediente}
            eliminarExpediente={eliminarExpediente}
            subirArchivo={subirArchivo}
            handlerArchivos={handlerArchivos}
            datosExpediente={datosExpediente}
            descripcionRef={descripcionRef}
            error={error}
            listadoArchivos={listadoArchivos}
            bajarArchivo={bajarArchivo}
          />
          <ModalVerExpediente
            exp={exp}
            cliente={cliente}
            denunciado={denunciado}
          />
        </>
      )}
    </Layout>
  );
};

export default Listado;
