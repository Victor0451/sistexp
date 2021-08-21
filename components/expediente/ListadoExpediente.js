import React from "react";
import ReactTable from "react-table";
import Spinner from "../layouts/Spinner";
import {matchSorter} from "match-sorter";
import router from "next/router";
import Link from "next/link";
import ModalSubirArchivo from "./ModalSubirArchivo";

const ListadoExpediente = ({
  expedientes,
  verExpediente,
  eliminarExpediente,
  subirArchivo,
  handlerArchivos,
  datosExpediente,
  descripcionRef,
  error,
  listadoArchivos,
  bajarArchivo
}) => {
  if (expedientes.legnth === 0) return <Spinner />;

  return (
    <div className="container mt-4 bg-dark rounded-3 p-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="text-white mb-4">
            Listado de Expedientes Registrados
          </h2>
        </div>
        <div className=" col-md-4 d-flex justify-content-end">
          <Link href="/expediente/nuevo" passHref>
            <button className="btn btn-sm btn-primary">
              Registrar Nuevo Cliente
            </button>
          </Link>
        </div>
      </div>
      <div className="list border border-white">
        <ReactTable
          data={expedientes}
          filterable
          defaultFilterMethod={(filter, row) => row[filter.id] === filter.value}
          columns={[
            {
              Header: "Expedientes",
              columns: [
                {
                  Header: "N° Expediente",
                  id: "nexpediente",
                  accessor: (d) => d.nexpediente,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, {
                      keys: ["nexpediente"],
                    }),
                  filterAll: true,
                },
                {
                  Header: "Año",
                  id: "ano",
                  accessor: (d) => d.ano,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["ano"] }),
                  filterAll: true,
                },
                {
                  Header: "Estado",
                  id: "estado",
                  accessor: (d) => d.estado,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["estado"] }),
                  filterAll: true,
                },
              ],
            },
            {
              Header: "Aciones",
              id: "Acciones",
              filterAll: true,

              Cell: function acciones(row) {
                return (
                  <div className="">
                    <button
                      className="btn btn-secondary me-1 btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => verExpediente(row.original)}
                    >
                      <i
                        className="text-dark fa fa-search"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      className=" btn btn-warning me-1 btn-sm "
                      // onClick={() => verSocio(row.original)}
                    >
                      <i className="fa fa-pencil" aria-hidden="true"></i>
                    </button>
                    <button
                      className=" btn btn-danger me-1 btn-sm"
                      onClick={() =>
                        eliminarExpediente(row.original.idexpediente)
                      }
                    >
                      <i
                        className="text-dark fa fa-trash"
                        aria-hidden="true"
                      ></i>
                    </button>
                    <button
                      className=" btn btn-success btn-sm"
                      data-bs-toggle="modal"
                      data-bs-target="#subirArchivo"
                      onClick={() => datosExpediente(row.original)}
                    >
                      <i
                        className="fa fa-upload text-dark"
                        aria-hidden="true"
                      ></i>
                    </button>
                  </div>
                );
              },
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
      <ModalSubirArchivo
        subirArchivo={subirArchivo}
        handlerArchivos={handlerArchivos}
        descripcionRef={descripcionRef}
        error={error}
        listadoArchivos={listadoArchivos}
        bajarArchivo={bajarArchivo}
      />
    </div>
  );
};

export default ListadoExpediente;
