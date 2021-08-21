import React, { useEffect } from "react";
import Img from "next/image";
import ReactTable from "react-table";
import {matchSorter} from "match-sorter";

const ModalSubirArchivo = ({
  subirArchivo,
  handlerArchivos,
  descripcionRef,
  error,
  listadoArchivos,
  bajarArchivo,
}) => {
  return (
    <div
      className="modal fade"
      id="subirArchivo"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              <u>Expediente N°</u>:
              {listadoArchivos.length !== 0 ? (
                <>
                  {" "}
                  {listadoArchivos[0].nexpediente} - {listadoArchivos[0].ano}
                </>
              ) : null}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mt-4 bg-dark rounded-3 border border-dark text-white p-4">
              <div className="row border border-white p-4 d-flex justify-content-center">
                <div className="col-md-4 ">
                  <label className="mb-2">
                    <u>Seleccionar Archivo</u>
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    onChange={handlerArchivos}
                  />
                </div>

                <div className="col-md-4 mt-2">
                  <button
                    className="mt-4 btn btn-secondary"
                    onClick={() => subirArchivo()}
                  >
                    Subir Archivo
                  </button>
                </div>
                <div className="col-md-8 mt-2">
                  <label className="mb-2">
                    <u>Descripcion</u>
                  </label>
                  <textarea
                    rows="3"
                    className="form-control"
                    ref={descripcionRef}
                  />
                </div>

                {error ? (
                  <div className="col-md-12 mt-2">
                    <div className="alert alert-danger border border-white text-center text-uppercase">
                      {error}
                    </div>
                  </div>
                ) : null}
              </div>

              {listadoArchivos.length !== 0 ? (
                <div className="row mt-4 border border-white p-4 d-flex justify-content-center">
                  <div className="list text-dark">
                    <ReactTable
                      data={listadoArchivos}
                      filterable
                      defaultFilterMethod={(filter, row) =>
                        row[filter.id] === filter.value
                      }
                      columns={[
                        {
                          Header: "Listado de Archivos Subidos",
                          columns: [
                            {
                              Header: "Expediente",
                              id: "nexpediente",
                              accessor: (d) => d.nexpediente,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["nexpediente"],
                                }),
                              filterAll: true,
                              width: 100,
                            },
                            {
                              Header: "Año",
                              id: "ano",
                              accessor: (d) => d.ano,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["ano"],
                                }),
                              filterAll: true,
                              width: 100,
                            },
                            {
                              Header: "Descripcion",
                              id: "descripcion",
                              accessor: (d) => d.descripcion,
                              filterMethod: (filter, rows) =>
                                matchSorter(rows, filter.value, {
                                  keys: ["descripcion"],
                                }),
                              filterAll: true,
                            },
                          ],
                        },
                        {
                          Header: "Link de Descarga",
                          id: "link",
                          filterAll: true,
                          width: 200,

                          Cell: function acciones(row) {
                            return (
                              <div className="">
                                <button
                                  className="btn btn-success"
                                  onClick={() => bajarArchivo(row.original.url)}
                                >
                                  Descargar
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
                </div>
              ) : (
                <div className="alert alert-info mt-4 border broder-white text-center text-uppercase">
                  Este expediente no tiene archivos subidos
                </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalSubirArchivo;
