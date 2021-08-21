import React from "react";
import ReactTable from "react-table";
import Spinner from "../layouts/Spinner";
import {matchSorter} from "match-sorter";
import router from "next/router";
import Link from "next/link";

const ListadoPersonal = ({ personal, verPersonal, eliminarPersonal }) => {
  if (personal.legnth === 0) return <Spinner />;

  return (
    <div className="container mt-4 bg-dark rounded-3 p-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="text-white mb-4">Listado del Personal Registrados</h2>
        </div>
        <div className=" col-md-4 d-flex justify-content-end">
          <Link href="/personal/nuevo" passHref>
            <button className="btn btn-sm btn-primary">
              Registrar Nuevo Personal
            </button>
          </Link>
        </div>
      </div>

      <div className="list border border-white">
        <ReactTable
          data={personal}
          filterable
          defaultFilterMethod={(filter, row) => row[filter.id] === filter.value}
          columns={[
            {
              Header: "Socios",
              columns: [
                {
                  Header: "ID Personal",
                  id: "idpersonal",
                  accessor: (d) => d.idpersonal,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["idpersonal"] }),
                  filterAll: true,
                },
                {
                  Header: "Apellido",
                  id: "apellido",
                  accessor: (d) => d.apellido,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["apellido"] }),
                  filterAll: true,
                },
                {
                  Header: "Nombre",
                  id: "nombre",
                  accessor: (d) => d.nombre,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["nombre"] }),
                  filterAll: true,
                },
                {
                  Header: "DNI",
                  id: "dni",
                  accessor: (d) => d.dni,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["dni"] }),
                  filterAll: true,
                },
                {
                  Header: "Cuit",
                  id: "cuit",
                  accessor: (d) => d.cuit,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["cuit"] }),
                  filterAll: true,
                },
                {
                  Header: "Rol",
                  id: "rol",
                  accessor: (d) => d.rol,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["rol"] }),
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
                      onClick={() => verPersonal(row.original)}
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
                      onClick={() => eliminarPersonal(row.original.idpersonal)}
                    >
                      <i
                        className="text-dark fa fa-trash"
                        aria-hidden="true"
                      ></i>
                    </button>
                    {/* <button
                      className=" btn btn-info btn-sm"
                      onClick={() => {
                        router.push({
                          pathname: "/socio/carnet",
                          query: {
                            id: row.original.id,
                          },
                        });
                      }}
                    >
                      <i
                        className="text-dark fa fa-address-card-o"
                        aria-hidden="true"
                      ></i>
                    </button> */}
                  </div>
                );
              },
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
      </div>
    </div>
  );
};

export default ListadoPersonal;
