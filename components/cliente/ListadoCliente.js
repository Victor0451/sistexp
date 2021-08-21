import React from "react";
import ReactTable from "react-table";
import Spinner from "../layouts/Spinner";
import {matchSorter} from "match-sorter";
import router from "next/router";
import Link from "next/link";

const ListadoCliente = ({ clientes, verCliente, eliminarCliente }) => {
  if (clientes.legnth === 0) return <Spinner />;

  return (
    <div className="container mt-4 bg-dark rounded-3 p-4">
      <div className="row mb-4">
        <div className="col-md-8">
          <h2 className="text-white mb-4">Listado de Clientes Registrados</h2>
        </div>
        <div className=" col-md-4 d-flex justify-content-end">
          <Link href="/cliente/nuevo" passHref>
            <button className="btn btn-sm btn-primary">
              Registrar Nuevo Cliente
            </button>
          </Link>
        </div>
      </div>
      <div className="list border border-white">
        <ReactTable
          data={clientes}
          filterable
          defaultFilterMethod={(filter, row) => row[filter.id] === filter.value}
          columns={[
            {
              Header: "Clientes",
              columns: [
                {
                  Header: "ID Cliente",
                  id: "idcliente",
                  accessor: (d) => d.idcliente,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["idcliente"] }),
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
                      onClick={() => verCliente(row.original)}
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
                      onClick={() => eliminarCliente(row.original.idcliente)}
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

export default ListadoCliente;
