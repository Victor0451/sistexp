import React from "react";
import ReactTable from "react-table";
import {matchSorter} from "match-sorter";
import Spinner from "../layouts/Spinner";
import moment from "moment";

const ModalVerAudiencias = ({ events }) => {
  if (events.length === 0) return <Spinner />;

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              <u>Listado de Audiencias de Hoy</u>
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
              <div className="list text-dark">
                <ReactTable
                  data={events}
                  filterable
                  defaultFilterMethod={(filter, row) =>
                    row[filter.id] === filter.value
                  }
                  columns={[
                    {
                      Header: "Audiencias",
                      columns: [
                        {
                          Header: "Descripcion",
                          id: "title",
                          accessor: (d) => d.title,
                          filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, {
                              keys: ["title"],
                            }),
                          filterAll: true,
                        },
                        {
                          Header: "Inicio",
                          id: "start",
                          accessor: (d) =>
                            moment(d.start).format("DD/MM/YYYY HH:mm:ss"),
                          filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, {
                              keys: ["start"],
                            }),
                          filterAll: true,
                        },
                        {
                          Header: "Fin",
                          id: "end",
                          accessor: (d) =>
                            moment(d.end).format("DD/MM/YYYY HH:mm:ss"),
                          filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, { keys: ["end"] }),
                          filterAll: true,
                        },
                        {
                          Header: "Expediente",
                          id: "expediente",
                          accessor: (d) => d.expediente,
                          filterMethod: (filter, rows) =>
                            matchSorter(rows, filter.value, {
                              keys: ["expediente"],
                            }),
                          filterAll: true,
                        },
                      ],
                    },
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </div>
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

export default ModalVerAudiencias;
